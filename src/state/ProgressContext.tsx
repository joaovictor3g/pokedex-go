import React, { createContext, ReactNode, useCallback, useContext, useMemo, useState } from "react";
import { Challenge, challenges, levelFromXp } from "../data/challenges";
import { usePersistentState } from "./usePersistentState";

interface Progress {
  // Pokémon id -> its type names, recorded when the detail screen is opened.
  seen: Record<number, string[]>;
  claimed: string[];
}

interface ProgressContextValue {
  level: number;
  xpIntoLevel: number;
  xpToNext: number;
  seenCount: number;
  markSeen: (id: number, types: string[]) => void;
  progressOf: (challenge: Challenge) => number;
  isClaimed: (challenge: Challenge) => boolean;
  claim: (challenge: Challenge) => void;
  // Set right after a claim that raised the level, so the UI can celebrate it.
  levelUpTo: number | null;
  dismissLevelUp: () => void;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

function totalXp(claimed: string[]) {
  return challenges.filter((c) => claimed.includes(c.id)).reduce((sum, c) => sum + c.xp, 0);
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = usePersistentState<Progress>("@pokedexgo:progress", {
    seen: {},
    claimed: [],
  });
  const [levelUpTo, setLevelUpTo] = useState<number | null>(null);

  const markSeen = useCallback(
    (id: number, types: string[]) =>
      setProgress((current) =>
        current.seen[id] ? current : { ...current, seen: { ...current.seen, [id]: types } }
      ),
    [setProgress]
  );

  const progressOf = useCallback(
    (challenge: Challenge) => {
      const seenTypes = Object.values(progress.seen);
      const count =
        challenge.type === "any"
          ? seenTypes.length
          : seenTypes.filter((types) => types.includes(challenge.type)).length;
      return Math.min(count, challenge.goal);
    },
    [progress.seen]
  );

  const claim = useCallback(
    (challenge: Challenge) => {
      if (progress.claimed.includes(challenge.id) || progressOf(challenge) < challenge.goal) return;
      const claimed = [...progress.claimed, challenge.id];
      const before = levelFromXp(totalXp(progress.claimed)).level;
      const after = levelFromXp(totalXp(claimed)).level;
      setProgress({ ...progress, claimed });
      if (after > before) setLevelUpTo(after);
    },
    [progress, progressOf, setProgress]
  );

  const value = useMemo(() => {
    const { level, xpIntoLevel, xpToNext } = levelFromXp(totalXp(progress.claimed));
    return {
      level,
      xpIntoLevel,
      xpToNext,
      seenCount: Object.keys(progress.seen).length,
      markSeen,
      progressOf,
      isClaimed: (challenge: Challenge) => progress.claimed.includes(challenge.id),
      claim,
      levelUpTo,
      dismissLevelUp: () => setLevelUpTo(null),
    };
  }, [progress, markSeen, progressOf, claim, levelUpTo]);

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) throw new Error("useProgress must be used inside ProgressProvider");
  return context;
}
