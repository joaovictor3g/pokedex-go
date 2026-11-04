// Pure progress rules. The provider only stores the result.
import { challenges, levelFromXp, type Challenge } from "./challenges";

export interface SeenEntry {
  types: string[];
  at: number; // ms timestamp of the first visit
}

export interface Progress {
  seen: Record<number, SeenEntry>;
  claimed: string[];
}

export const emptyProgress: Progress = { seen: {}, claimed: [] };

// Earlier versions stored `seen` as id -> type names.
export function normalizeProgress(stored: unknown): Progress {
  const value = (stored ?? {}) as {
    seen?: Record<number, SeenEntry | string[]>;
    claimed?: string[];
  };
  const seen: Record<number, SeenEntry> = {};
  for (const [id, entry] of Object.entries(value.seen ?? {})) {
    seen[Number(id)] = Array.isArray(entry) ? { types: entry, at: 0 } : entry;
  }
  return { seen, claimed: value.claimed ?? [] };
}

export function markSeen(
  progress: Progress,
  id: number,
  types: string[],
  now = Date.now(),
): Progress {
  if (progress.seen[id]) return progress;
  return { ...progress, seen: { ...progress.seen, [id]: { types, at: now } } };
}

export function challengeProgress(progress: Progress, challenge: Challenge) {
  const entries = Object.values(progress.seen);
  const count =
    challenge.type === "any"
      ? entries.length
      : entries.filter((entry) => entry.types.includes(challenge.type)).length;
  return Math.min(count, challenge.goal);
}

export function totalXp(claimed: string[]) {
  return challenges.filter((c) => claimed.includes(c.id)).reduce((sum, c) => sum + c.xp, 0);
}

export function canClaim(progress: Progress, challenge: Challenge) {
  return (
    !progress.claimed.includes(challenge.id) &&
    challengeProgress(progress, challenge) >= challenge.goal
  );
}

// Returns the new progress and the level reached, if the claim raised it.
export function claimChallenge(progress: Progress, challenge: Challenge) {
  if (!canClaim(progress, challenge)) return { progress, levelUpTo: null };
  const claimed = [...progress.claimed, challenge.id];
  const before = levelFromXp(totalXp(progress.claimed)).level;
  const after = levelFromXp(totalXp(claimed)).level;
  return { progress: { ...progress, claimed }, levelUpTo: after > before ? after : null };
}

export function recentlySeen(progress: Progress, limit: number) {
  return Object.entries(progress.seen)
    .sort(([, a], [, b]) => b.at - a.at)
    .slice(0, limit)
    .map(([id]) => Number(id));
}
