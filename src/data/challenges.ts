import type { PokemonTypeName } from "../theme/pokemonTypes";

export interface Challenge {
  id: string;
  title: string;
  description: string;
  // Counts Pokémon of this type the trainer has opened; "any" counts all of them.
  type: PokemonTypeName | "any";
  goal: number;
  xp: number;
}

export const challenges: Challenge[] = [
  { id: "discovery", title: "Descoberta", description: "Conheça 10 Pokémon de qualquer tipo.", type: "any", goal: 10, xp: 280 },
  { id: "electric", title: "Descoberta eletrizante", description: "Conheça 4 Pokémon do tipo elétrico.", type: "electric", goal: 4, xp: 400 },
  { id: "fire", title: "Descoberta quente", description: "Conheça 4 Pokémon do tipo fogo.", type: "fire", goal: 4, xp: 400 },
  { id: "water", title: "Mergulho", description: "Conheça 4 Pokémon do tipo água.", type: "water", goal: 4, xp: 400 },
  { id: "grass", title: "Jardineiro", description: "Conheça 4 Pokémon do tipo planta.", type: "grass", goal: 4, xp: 400 },
  { id: "dragon", title: "Caçador de dragões", description: "Conheça 2 Pokémon do tipo dragão.", type: "dragon", goal: 2, xp: 600 },
  { id: "explorer", title: "Explorador", description: "Conheça 50 Pokémon de qualquer tipo.", type: "any", goal: 50, xp: 1200 },
];

// XP needed to go from `level` to `level + 1` (same curve as the original app).
export function xpForNextLevel(level: number) {
  return Math.pow((level + 1) * 4, 3);
}

export function levelFromXp(totalXp: number) {
  let level = 0;
  let remaining = totalXp;
  while (remaining >= xpForNextLevel(level)) {
    remaining -= xpForNextLevel(level);
    level += 1;
  }
  return { level, xpIntoLevel: remaining, xpToNext: xpForNextLevel(level) };
}
