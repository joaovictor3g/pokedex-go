import React from "react";
import { StyleProp } from "react-native";
import { Image, ImageStyle } from "expo-image";
import { artworkUrl } from "../api/pokeapi";

interface PokemonArtworkProps {
  id: number;
  size: number;
  style?: StyleProp<ImageStyle>;
}

export function PokemonArtwork({ id, size, style }: PokemonArtworkProps) {
  return (
    <Image
      source={artworkUrl(id)}
      style={[{ width: size, height: size }, style]}
      contentFit="contain"
      transition={200}
      cachePolicy="memory-disk"
      recyclingKey={String(id)}
    />
  );
}
