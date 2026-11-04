import React, { memo } from "react";
import styled from "styled-components/native";
import { PokemonSummary, usePokemon } from "../api/pokeapi";
import { fonts, radius, textColorOn } from "../theme";
import { getTypeInfo } from "../theme/pokemonTypes";
import { formatName, formatNumber } from "../utils/format";
import { PokemonArtwork } from "./PokemonArtwork";
import { PokeballWatermark } from "./PokeballWatermark";
import { TypeBadge } from "./TypeBadge";

interface PokemonCardProps {
  pokemon: PokemonSummary;
  onPress: (pokemon: PokemonSummary) => void;
}

// Grid card: name, number and types on a background colored by the primary type.
export const PokemonCard = memo(function PokemonCard({ pokemon, onPress }: PokemonCardProps) {
  const { data } = usePokemon(pokemon.id);
  const types = data?.types.map((t) => t.type.name) ?? [];
  const background = types[0] ? getTypeInfo(types[0]).color : "#C9CBD4";
  const foreground = textColorOn(background);

  return (
    <Card $background={background} onPress={() => onPress(pokemon)} activeOpacity={0.85}>
      <PokeballWatermark size={110} style={{ right: -18, bottom: -18 }} />
      <NumberText $color={foreground}>{formatNumber(pokemon.id)}</NumberText>
      <Name $color={foreground} numberOfLines={1}>
        {formatName(pokemon.name)}
      </Name>
      <Types>
        {types.map((type) => (
          <TypeBadge key={type} type={type} variant="onColor" compact />
        ))}
      </Types>
      <PokemonArtwork id={pokemon.id} size={86} style={{ position: "absolute", right: 6, bottom: 6 }} />
    </Card>
  );
});

const Card = styled.TouchableOpacity<{ $background: string }>`
  flex: 1;
  height: 130px;
  margin: 6px;
  padding: 12px;
  border-radius: ${radius.lg}px;
  overflow: hidden;
  background-color: ${(p) => p.$background};
`;

const NumberText = styled.Text<{ $color: string }>`
  position: absolute;
  top: 10px;
  right: 14px;
  font-family: ${fonts.bold};
  font-size: 12px;
  color: ${(p) => p.$color};
  opacity: 0.6;
`;

const Name = styled.Text<{ $color: string }>`
  font-family: ${fonts.bold};
  font-size: 15px;
  color: ${(p) => p.$color};
  margin-top: 14px;
  margin-right: 8px;
`;

const Types = styled.View`
  gap: 4px;
  margin-top: 6px;
`;
