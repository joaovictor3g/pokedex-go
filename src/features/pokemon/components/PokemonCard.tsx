import type { ReactNode } from "react";
import { Pressable, type PressableProps } from "react-native";
import { formatName, formatNumber } from "@/lib/format";
import { shade, textColorOn } from "@/theme/colors";
import { getTypeInfo } from "@/theme/pokemonTypes";
import { Gradient } from "@/ui/Gradient";
import { PokeballWatermark } from "@/ui/PokeballWatermark";
import { Text } from "@/ui/Text";
import { usePokemon } from "../api";
import { typeNamesOf, type PokemonSummary } from "../logic";
import { Artwork } from "./Artwork";
import { PokemonLink } from "./PokemonLink";
import { TypeBadge } from "./TypeBadge";

const LOADING_COLOR = "#B9BBC6";

// Grid card colored by the Pokémon's primary type.
export function PokemonCard({ pokemon }: { pokemon: PokemonSummary }) {
  const { data } = usePokemon(pokemon.id);
  const types = typeNamesOf(data);
  const color = types[0] ? getTypeInfo(types[0]).color : LOADING_COLOR;
  const foreground = textColorOn(color);

  return (
    <PokemonLink pokemon={pokemon}>
      <CardPressable color={color} accessibilityLabel={formatName(pokemon.name)}>
        <PokeballWatermark size={120} style={{ right: -22, bottom: -22 }} />
        <Text
          color={foreground}
          className="absolute right-3.5 top-2.5 text-xs font-bold opacity-60"
        >
          {formatNumber(pokemon.id)}
        </Text>
        <Text color={foreground} numberOfLines={1} className="mb-1 mr-2 mt-4 text-[15px] font-bold">
          {formatName(pokemon.name)}
        </Text>
        {types.map((type) => (
          <TypeBadge key={type} type={type} variant="onColor" size="sm" />
        ))}
        <Artwork id={pokemon.id} size={88} style={{ position: "absolute", right: 6, bottom: 6 }} />
      </CardPressable>
    </PokemonLink>
  );
}

// <Link asChild> injects onPress/onPressIn here.
function CardPressable({
  color,
  children,
  ...props
}: Omit<PressableProps, "children"> & { color: string; children: ReactNode }) {
  return (
    <Pressable
      {...props}
      className="m-1.5 h-[132px] flex-1 overflow-hidden rounded-3xl active:opacity-90"
    >
      <Gradient colors={[color, shade(color, 0.18)]} className="flex-1 gap-1 p-3">
        {children}
      </Gradient>
    </Pressable>
  );
}
