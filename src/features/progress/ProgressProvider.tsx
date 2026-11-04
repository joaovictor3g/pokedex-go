import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { usePersistentState } from "@/lib/usePersistentState";
import { levelFromXp, type Challenge } from "./challenges";
import {
  canClaim,
  challengeProgress,
  claimChallenge,
  emptyProgress,
  markSeen,
  normalizeProgress,
  recentlySeen,
  totalXp,
  type Progress,
} from "./progress";

interface ProgressContextValue {
  level: number;
  xpIntoLevel: number;
  xpToNext: number;
  seenCount: number;
  recent: (limit: number) => number[];
  markSeen: (id: number, types: string[]) => void;
  progressOf: (challenge: Challenge) => number;
  isClaimed: (challenge: Challenge) => boolean;
  canClaim: (challenge: Challenge) => boolean;
  claim: (challenge: Challenge) => void;
  // Set right after a claim that raised the level, so the UI can celebrate it.
  levelUpTo: number | null;
  dismissLevelUp: () => void;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [stored, setStored] = usePersistentState<Progress>("@pokedexgo:progress", emptyProgress);
  const [levelUpTo, setLevelUpTo] = useState<number | null>(null);
  const progress = normalizeProgress(stored);
  const { level, xpIntoLevel, xpToNext } = levelFromXp(totalXp(progress.claimed));

  // Stable identity: the detail screen calls this from an effect.
  const markSeenStable = useCallback(
    (id: number, types: string[]) =>
      setStored((current) => markSeen(normalizeProgress(current), id, types)),
    [setStored],
  );

  const value: ProgressContextValue = {
    level,
    xpIntoLevel,
    xpToNext,
    seenCount: Object.keys(progress.seen).length,
    recent: (limit) => recentlySeen(progress, limit),
    markSeen: markSeenStable,
    progressOf: (challenge) => challengeProgress(progress, challenge),
    isClaimed: (challenge) => progress.claimed.includes(challenge.id),
    canClaim: (challenge) => canClaim(progress, challenge),
    claim: (challenge) => {
      const result = claimChallenge(progress, challenge);
      setStored(result.progress);
      if (result.levelUpTo !== null) setLevelUpTo(result.levelUpTo);
    },
    levelUpTo,
    dismissLevelUp: () => setLevelUpTo(null),
  };

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) throw new Error("useProgress must be used inside ProgressProvider");
  return context;
}
