import { challenges, levelFromXp, xpForNextLevel } from "../challenges";
import {
  canClaim,
  challengeProgress,
  claimChallenge,
  emptyProgress,
  markSeen,
  normalizeProgress,
  recentlySeen,
  totalXp,
} from "../progress";

const discovery = challenges.find((c) => c.id === "discovery")!; // 10 of any type, 280 XP
const electric = challenges.find((c) => c.id === "electric")!; // 4 electric, 400 XP

function seenMany(count: number, types: string[], startId = 1) {
  let progress = emptyProgress;
  for (let i = 0; i < count; i++) progress = markSeen(progress, startId + i, types, i);
  return progress;
}

describe("levelFromXp", () => {
  it("starts at level 0 and follows the original curve", () => {
    expect(xpForNextLevel(0)).toBe(64);
    expect(xpForNextLevel(1)).toBe(512);
    expect(levelFromXp(0)).toEqual({ level: 0, xpIntoLevel: 0, xpToNext: 64 });
    expect(levelFromXp(63).level).toBe(0);
    expect(levelFromXp(64)).toEqual({ level: 1, xpIntoLevel: 0, xpToNext: 512 });
    expect(levelFromXp(64 + 512 + 10)).toEqual({ level: 2, xpIntoLevel: 10, xpToNext: 1728 });
  });
});

describe("markSeen", () => {
  it("records a Pokémon once and keeps the first visit time", () => {
    const once = markSeen(emptyProgress, 25, ["electric"], 100);
    const twice = markSeen(once, 25, ["electric"], 200);
    expect(twice).toBe(once);
    expect(twice.seen[25]).toEqual({ types: ["electric"], at: 100 });
  });
});

describe("challengeProgress", () => {
  it("counts every type for 'any' challenges and caps at the goal", () => {
    expect(challengeProgress(seenMany(3, ["fire"]), discovery)).toBe(3);
    expect(challengeProgress(seenMany(25, ["fire"]), discovery)).toBe(discovery.goal);
  });

  it("counts only matching types for typed challenges", () => {
    let progress = seenMany(2, ["water"]);
    progress = markSeen(progress, 100, ["electric"]);
    progress = markSeen(progress, 101, ["flying", "electric"]);
    expect(challengeProgress(progress, electric)).toBe(2);
  });
});

describe("claimChallenge", () => {
  it("refuses incomplete challenges", () => {
    const progress = seenMany(3, ["fire"]);
    expect(canClaim(progress, discovery)).toBe(false);
    expect(claimChallenge(progress, discovery)).toEqual({ progress, levelUpTo: null });
  });

  it("pays out once and reports a level up", () => {
    const ready = seenMany(10, ["electric"]);
    const first = claimChallenge(ready, discovery);
    expect(first.progress.claimed).toEqual(["discovery"]);
    expect(first.levelUpTo).toBe(1); // 280 XP: past the 64 XP needed for level 1

    const again = claimChallenge(first.progress, discovery);
    expect(again.progress).toBe(first.progress);
    expect(totalXp(again.progress.claimed)).toBe(280);
  });

  it("reports a level up only when the level actually changes", () => {
    const fire = challenges.find((c) => c.id === "fire")!; // 4 fire, 400 XP
    const ready = seenMany(10, ["electric", "fire"]);
    const afterDiscovery = claimChallenge(ready, discovery).progress; // 280 XP -> level 1
    const afterElectric = claimChallenge(afterDiscovery, electric); // 680 XP -> level 2
    expect(afterElectric.levelUpTo).toBe(2);

    const afterFire = claimChallenge(afterElectric.progress, fire); // 1080 XP -> still level 2
    expect(afterFire.progress.claimed).toContain("fire");
    expect(afterFire.levelUpTo).toBeNull();
  });
});

describe("normalizeProgress", () => {
  it("migrates the old id -> types shape", () => {
    expect(normalizeProgress({ seen: { 25: ["electric"] }, claimed: ["fire"] })).toEqual({
      seen: { 25: { types: ["electric"], at: 0 } },
      claimed: ["fire"],
    });
  });

  it("tolerates missing or empty storage", () => {
    expect(normalizeProgress(null)).toEqual(emptyProgress);
    expect(normalizeProgress({})).toEqual(emptyProgress);
  });
});

describe("recentlySeen", () => {
  it("lists the newest visits first", () => {
    let progress = markSeen(emptyProgress, 1, [], 10);
    progress = markSeen(progress, 2, [], 30);
    progress = markSeen(progress, 3, [], 20);
    expect(recentlySeen(progress, 2)).toEqual([2, 3]);
  });
});
