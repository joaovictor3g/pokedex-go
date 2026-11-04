import { useQuery, type QueryClient } from "@tanstack/react-query";
import {
  flattenChain,
  idFromUrl,
  POKEDEX_SIZE,
  type EvolutionNode,
  type Pokemon,
  type PokemonSpecies,
  type PokemonSummary,
} from "./logic";

const BASE_URL = "https://pokeapi.co/api/v2";

async function get<T>(path: string): Promise<T> {
  const response = await fetch(path.startsWith("http") ? path : `${BASE_URL}${path}`);
  if (!response.ok) throw new Error(`PokeAPI ${response.status}: ${path}`);
  return response.json();
}

// PokeAPI data never changes, so everything is cached for good (and persisted, see app/_layout).
const forever = { staleTime: Infinity } as const;

const pokemonQuery = (id: number) => ({
  queryKey: ["pokemon", id] as const,
  queryFn: () => get<Pokemon>(`/pokemon/${id}`),
  ...forever,
});

const speciesQuery = (id: number) => ({
  queryKey: ["species", id] as const,
  queryFn: () => get<PokemonSpecies>(`/pokemon-species/${id}`),
  ...forever,
});

export function usePokemonIndex() {
  return useQuery({
    queryKey: ["pokemon-index"],
    queryFn: async () => {
      const data = await get<{ results: { name: string; url: string }[] }>(
        `/pokemon?limit=${POKEDEX_SIZE}`,
      );
      return data.results.map<PokemonSummary>((item) => ({
        id: idFromUrl(item.url),
        name: item.name,
      }));
    },
    ...forever,
  });
}

export function usePokemon(id: number) {
  return useQuery(pokemonQuery(id));
}

export function useSpecies(id: number) {
  return useQuery(speciesQuery(id));
}

export function useEvolutionChain(url: string | undefined) {
  return useQuery({
    queryKey: ["evolution", url],
    queryFn: async () => flattenChain((await get<{ chain: EvolutionNode }>(url!)).chain),
    enabled: !!url,
    ...forever,
  });
}

// Ids of every Pokémon of a type, for the Pokédex type filter.
export function useTypeMembers(type: string | null) {
  return useQuery({
    queryKey: ["type-members", type],
    queryFn: async () => {
      const data = await get<{ pokemon: { pokemon: { url: string } }[] }>(`/type/${type}`);
      return data.pokemon.map((p) => idFromUrl(p.pokemon.url));
    },
    // The cache is persisted as JSON, so store an array and build the Set on read.
    select: (ids: number[]) => new Set(ids),
    enabled: !!type,
    ...forever,
  });
}

// Warms the cache on press-in so the detail screen usually opens fully loaded.
export function prefetchPokemon(queryClient: QueryClient, id: number) {
  void queryClient.prefetchQuery(pokemonQuery(id));
  void queryClient.prefetchQuery(speciesQuery(id));
}
