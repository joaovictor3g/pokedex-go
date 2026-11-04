export const pokemonTypes = {
  normal: { label: "Normal", color: "#A8A77A", icon: "circle-outline" },
  fire: { label: "Fogo", color: "#EE8130", icon: "fire" },
  water: { label: "Água", color: "#6390F0", icon: "water" },
  electric: { label: "Elétrico", color: "#F7D02C", icon: "lightning-bolt" },
  grass: { label: "Planta", color: "#7AC74C", icon: "leaf" },
  ice: { label: "Gelo", color: "#96D9D6", icon: "snowflake" },
  fighting: { label: "Lutador", color: "#C22E28", icon: "boxing-glove" },
  poison: { label: "Venenoso", color: "#A33EA1", icon: "skull" },
  ground: { label: "Terra", color: "#E2BF65", icon: "terrain" },
  flying: { label: "Voador", color: "#A98FF3", icon: "feather" },
  psychic: { label: "Psíquico", color: "#F95587", icon: "eye" },
  bug: { label: "Inseto", color: "#A6B91A", icon: "bug" },
  rock: { label: "Pedra", color: "#B6A136", icon: "diamond-stone" },
  ghost: { label: "Fantasma", color: "#735797", icon: "ghost" },
  dragon: { label: "Dragão", color: "#6F35FC", icon: "star-four-points" },
  dark: { label: "Sombrio", color: "#705746", icon: "moon-waning-crescent" },
  steel: { label: "Aço", color: "#B7B7CE", icon: "shield-half-full" },
  fairy: { label: "Fada", color: "#D685AD", icon: "creation" },
} as const;

export type PokemonTypeName = keyof typeof pokemonTypes;

const fallback = { label: "?", color: "#9A9CA8", icon: "pokeball" } as const;

export function getTypeInfo(name: string) {
  return pokemonTypes[name as PokemonTypeName] ?? fallback;
}
