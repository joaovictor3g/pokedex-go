import type { PokemonSummary } from "@/features/pokemon/logic";

// Adds the Pokémon if missing, removes it if present. Keeps the list sorted by number.
export function toggleIn(list: PokemonSummary[], pokemon: PokemonSummary) {
  return list.some((p) => p.id === pokemon.id)
    ? list.filter((p) => p.id !== pokemon.id)
    : [...list, { id: pokemon.id, name: pokemon.name }].sort((a, b) => a.id - b.id);
}
