import type { ComponentProps } from "react";
import type MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import type { SFSymbol } from "expo-symbols";

type MciName = ComponentProps<typeof MaterialCommunityIcons>["name"];

interface TypeInfo {
  label: string;
  color: string;
  sf: SFSymbol; // iOS
  mci: MciName; // Android and fallback
}

export const pokemonTypes = {
  normal: { label: "Normal", color: "#A8A77A", sf: "circle.circle.fill", mci: "circle-outline" },
  fire: { label: "Fogo", color: "#EE8130", sf: "flame.fill", mci: "fire" },
  water: { label: "Água", color: "#6390F0", sf: "drop.fill", mci: "water" },
  electric: { label: "Elétrico", color: "#F7D02C", sf: "bolt.fill", mci: "lightning-bolt" },
  grass: { label: "Planta", color: "#7AC74C", sf: "leaf.fill", mci: "leaf" },
  ice: { label: "Gelo", color: "#96D9D6", sf: "snowflake", mci: "snowflake" },
  fighting: { label: "Lutador", color: "#C22E28", sf: "figure.boxing", mci: "boxing-glove" },
  poison: { label: "Venenoso", color: "#A33EA1", sf: "flask.fill", mci: "skull" },
  ground: { label: "Terra", color: "#E2BF65", sf: "mountain.2.fill", mci: "terrain" },
  flying: { label: "Voador", color: "#A98FF3", sf: "bird.fill", mci: "feather" },
  psychic: { label: "Psíquico", color: "#F95587", sf: "eye.fill", mci: "eye" },
  bug: { label: "Inseto", color: "#A6B91A", sf: "ladybug.fill", mci: "bug" },
  rock: { label: "Pedra", color: "#B6A136", sf: "diamond.fill", mci: "diamond-stone" },
  ghost: { label: "Fantasma", color: "#735797", sf: "theatermasks.fill", mci: "ghost" },
  dragon: { label: "Dragão", color: "#6F35FC", sf: "lizard.fill", mci: "star-four-points" },
  dark: { label: "Sombrio", color: "#705746", sf: "moon.fill", mci: "moon-waning-crescent" },
  steel: { label: "Aço", color: "#B7B7CE", sf: "shield.fill", mci: "shield-half-full" },
  fairy: { label: "Fada", color: "#D685AD", sf: "sparkles", mci: "creation" },
} satisfies Record<string, TypeInfo>;

export type PokemonTypeName = keyof typeof pokemonTypes;

export const typeNames = Object.keys(pokemonTypes) as PokemonTypeName[];

const unknownType: TypeInfo = {
  label: "?",
  color: "#9A9CA8",
  sf: "questionmark.circle",
  mci: "pokeball",
};

export function getTypeInfo(name: string | undefined): TypeInfo {
  return pokemonTypes[name as PokemonTypeName] ?? unknownType;
}
