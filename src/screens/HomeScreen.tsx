import React, { useMemo } from "react";
import { ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { englishFlavorText, englishGenus, POKEDEX_SIZE, usePokemon, useSpecies } from "../api/pokeapi";
import { ErrorMessage, Loading } from "../components/Feedback";
import { PokeballWatermark } from "../components/PokeballWatermark";
import { PokemonArtwork } from "../components/PokemonArtwork";
import { TypeBadge } from "../components/TypeBadge";
import { TabScreenProps } from "../navigation/types";
import { useFavorites } from "../state/FavoritesContext";
import { useProgress } from "../state/ProgressContext";
import { useTrainer } from "../state/TrainerContext";
import { colors, fonts, radius, shadow, textColorOn } from "../theme";
import { getTypeInfo } from "../theme/pokemonTypes";
import { formatName, formatNumber } from "../utils/format";

// Same Pokémon for everyone on a given day.
function pokemonOfTheDay(date: Date) {
  const seed = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
  return ((seed * 7919) % POKEDEX_SIZE) + 1;
}

export function HomeScreen({ navigation }: TabScreenProps<"Home">) {
  const { trainer } = useTrainer();
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const { level, seenCount } = useProgress();
  const id = useMemo(() => pokemonOfTheDay(new Date()), []);
  const pokemon = usePokemon(id);
  const species = useSpecies(id);

  const types = pokemon.data?.types.map((t) => t.type.name) ?? [];
  const background = getTypeInfo(types[0] ?? "").color;
  const foreground = textColorOn(background);
  const favorite = isFavorite(id);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
        <Greeting>Olá, {trainer?.name} 👋</Greeting>
        <Subtitle>Seu Pokémon do dia</Subtitle>

        {pokemon.isError ? (
          <ErrorMessage onRetry={() => pokemon.refetch()} />
        ) : !pokemon.data ? (
          <Loading />
        ) : (
          <>
            <Hero
              $background={background}
              activeOpacity={0.9}
              onPress={() => navigation.navigate("PokemonDetail", { id })}
            >
              <PokeballWatermark size={220} style={{ right: -40, bottom: -50 }} />
              <HeroTop>
                <HeroNumber $color={foreground}>{formatNumber(id)}</HeroNumber>
                <FavoriteButton
                  hitSlop={12}
                  onPress={() => toggleFavorite({ id, name: pokemon.data.name })}
                >
                  <MaterialCommunityIcons
                    name={favorite ? "heart" : "heart-outline"}
                    size={28}
                    color={foreground}
                  />
                </FavoriteButton>
              </HeroTop>
              <HeroName $color={foreground}>{formatName(pokemon.data.name)}</HeroName>
              <HeroGenus $color={foreground}>{englishGenus(species.data)}</HeroGenus>
              <Badges>
                {types.map((type) => (
                  <TypeBadge key={type} type={type} variant="onColor" />
                ))}
              </Badges>
              <PokemonArtwork id={id} size={170} style={{ position: "absolute", right: 8, bottom: 8 }} />
            </Hero>

            {species.data && (
              <Section style={shadow}>
                <SectionTitle>Sobre</SectionTitle>
                <Body>{englishFlavorText(species.data)}</Body>
              </Section>
            )}
          </>
        )}

        <Stats>
          <Stat style={shadow}>
            <StatValue>{seenCount}</StatValue>
            <StatLabel>Vistos</StatLabel>
          </Stat>
          <Stat style={shadow}>
            <StatValue>{favorites.length}</StatValue>
            <StatLabel>Favoritos</StatLabel>
          </Stat>
          <Stat style={shadow}>
            <StatValue>{level}</StatValue>
            <StatLabel>Nível</StatLabel>
          </Stat>
        </Stats>
      </ScrollView>
    </SafeAreaView>
  );
}

const Greeting = styled.Text`
  font-family: ${fonts.bold};
  font-size: 26px;
  color: ${colors.text};
`;

const Subtitle = styled.Text`
  font-family: ${fonts.regular};
  font-size: 15px;
  color: ${colors.textMuted};
  margin-bottom: 16px;
`;

const Hero = styled.TouchableOpacity<{ $background: string }>`
  height: 250px;
  padding: 20px;
  border-radius: ${radius.xl}px;
  overflow: hidden;
  background-color: ${(p) => p.$background};
`;

const HeroTop = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const HeroNumber = styled.Text<{ $color: string }>`
  font-family: ${fonts.bold};
  font-size: 16px;
  color: ${(p) => p.$color};
  opacity: 0.7;
`;

const FavoriteButton = styled.TouchableOpacity``;

const HeroName = styled.Text<{ $color: string }>`
  font-family: ${fonts.bold};
  font-size: 30px;
  color: ${(p) => p.$color};
  margin-top: 4px;
`;

const HeroGenus = styled.Text<{ $color: string }>`
  font-family: ${fonts.regular};
  font-size: 13px;
  color: ${(p) => p.$color};
  opacity: 0.85;
  margin-bottom: 10px;
`;

const Badges = styled.View`
  gap: 6px;
`;

const Section = styled.View`
  margin-top: 20px;
  padding: 20px;
  border-radius: ${radius.lg}px;
  background-color: ${colors.surface};
`;

const SectionTitle = styled.Text`
  font-family: ${fonts.semibold};
  font-size: 17px;
  color: ${colors.text};
  margin-bottom: 6px;
`;

const Body = styled.Text`
  font-family: ${fonts.regular};
  font-size: 15px;
  line-height: 23px;
  color: ${colors.textMuted};
`;

const Stats = styled.View`
  flex-direction: row;
  gap: 12px;
  margin-top: 20px;
`;

const Stat = styled.View`
  flex: 1;
  align-items: center;
  padding: 16px 8px;
  border-radius: ${radius.lg}px;
  background-color: ${colors.surface};
`;

const StatValue = styled.Text`
  font-family: ${fonts.bold};
  font-size: 22px;
  color: ${colors.primary};
`;

const StatLabel = styled.Text`
  font-family: ${fonts.regular};
  font-size: 12px;
  color: ${colors.textMuted};
`;
