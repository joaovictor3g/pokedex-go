import { useQuery } from "@tanstack/react-query";

const BASE_URL = "https://pokeapi.co/api/v2";

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

async function get<T>(path: string): Promise<T> {
  const response = await fetch(path.startsWith("http") ? path : `${BASE_URL}${path}`);
  if (!response.ok) throw new Error(`PokeAPI ${response.status}: ${path}`);
  return response.json();
}

export function idFromUrl(url: string) {
  return Number(url.split("/").filter(Boolean).pop());
}

export function artworkUrl(id: number) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

export function usePokemonIndex() {
  return useQuery({
    queryKey: ["pokemon-index"],
    queryFn: async () => {
      const data = await get<{ results: { name: string; url: string }[] }>(
        `/pokemon?limit=${POKEDEX_SIZE}`
      );
      return data.results.map<PokemonSummary>((item) => ({
        id: idFromUrl(item.url),
        name: item.name,
      }));
    },
    staleTime: Infinity,
  });
}

export function usePokemon(id: number) {
  return useQuery({
    queryKey: ["pokemon", id],
    queryFn: () => get<Pokemon>(`/pokemon/${id}`),
    staleTime: Infinity,
  });
}

export function useSpecies(id: number) {
  return useQuery({
    queryKey: ["species", id],
    queryFn: () => get<PokemonSpecies>(`/pokemon-species/${id}`),
    staleTime: Infinity,
  });
}

export function useEvolutionChain(url?: string) {
  return useQuery({
    queryKey: ["evolution", url],
    queryFn: async () => {
      const { chain } = await get<{ chain: EvolutionNode }>(url!);
      return flattenChain(chain);
    },
    enabled: !!url,
    staleTime: Infinity,
  });
}

// Breadth-first list of evolution stages, e.g. [[bulbasaur], [ivysaur], [venusaur]].
function flattenChain(root: EvolutionNode): PokemonSummary[][] {
  const stages: PokemonSummary[][] = [];
  let level = [root];
  while (level.length > 0) {
    stages.push(level.map((node) => ({ id: idFromUrl(node.species.url), name: node.species.name })));
    level = level.flatMap((node) => node.evolves_to);
  }
  return stages;
}

export function englishFlavorText(species?: PokemonSpecies) {
  const entry = species?.flavor_text_entries.findLast((e) => e.language.name === "en");
  return entry?.flavor_text.replace(/[\n\f\r]+/g, " ") ?? "";
}

export function englishGenus(species?: PokemonSpecies) {
  return species?.genera.find((g) => g.language.name === "en")?.genus ?? "";
}
