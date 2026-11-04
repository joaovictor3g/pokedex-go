// Pure helpers around PokeAPI data. No React, no network: easy to unit test.

// National Pokédex size (Gen 1–9). Ids above this are alternate forms.
export const POKEDEX_SIZE = 1025;

export interface PokemonSummary {
  id: number;
  name: string;
}

export interface Pokemon {
  id: number;
  name: string;
  height: number; // decimetres
  weight: number; // hectograms
  types: { slot: number; type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  abilities: { ability: { name: string }; is_hidden: boolean }[];
}

export interface PokemonSpecies {
  id: number;
  genera: { genus: string; language: { name: string } }[];
  flavor_text_entries: { flavor_text: string; language: { name: string } }[];
  evolution_chain: { url: string };
}

export interface EvolutionNode {
  species: { name: string; url: string };
  evolves_to: EvolutionNode[];
}

export function idFromUrl(url: string) {
  return Number(url.split("/").filter(Boolean).pop());
}

export function artworkUrl(id: number) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

export function typeNamesOf(pokemon: Pick<Pokemon, "types"> | undefined) {
  return pokemon?.types.map((t) => t.type.name) ?? [];
}

// Breadth-first evolution stages, e.g. [[eevee], [vaporeon, jolteon, ...]].
export function flattenChain(root: EvolutionNode): PokemonSummary[][] {
  const stages: PokemonSummary[][] = [];
  let level = [root];
  while (level.length > 0) {
    stages.push(
      level.map((node) => ({ id: idFromUrl(node.species.url), name: node.species.name })),
    );
    level = level.flatMap((node) => node.evolves_to);
  }
  return stages;
}

export function englishFlavorText(species: PokemonSpecies | undefined) {
  const entry = species?.flavor_text_entries.findLast((e) => e.language.name === "en");
  return (
    entry?.flavor_text
      .replace(/[\n\f\r]+/g, " ")
      .replace(/\s+/g, " ")
      .trim() ?? ""
  );
}

export function englishGenus(species: PokemonSpecies | undefined) {
  return species?.genera.find((g) => g.language.name === "en")?.genus ?? "";
}

// Matches by name ("char", "mr mime") or by number ("25", "#025").
export function matchesQuery(pokemon: PokemonSummary, rawQuery: string) {
  const query = rawQuery.trim().toLowerCase();
  if (!query) return true;
  const digits = query.replace(/^#/, "");
  if (/^\d+$/.test(digits)) return String(pokemon.id).startsWith(String(Number(digits)));
  return pokemon.name.replace(/-/g, " ").includes(query.replace(/-/g, " "));
}

// Same Pokémon for everyone on a given calendar day.
export function pokemonOfTheDay(date: Date) {
  const seed = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
  return ((seed * 7919) % POKEDEX_SIZE) + 1;
}
