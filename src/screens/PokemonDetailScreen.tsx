import React, { Fragment, useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import {
  englishFlavorText,
  englishGenus,
  Pokemon,
  PokemonSpecies,
  useEvolutionChain,
  usePokemon,
  useSpecies,
} from "../api/pokeapi";
import { ErrorMessage, Loading } from "../components/Feedback";
import { PokeballWatermark } from "../components/PokeballWatermark";
import { PokemonArtwork } from "../components/PokemonArtwork";
import { ProgressBar } from "../components/ProgressBar";
import { TypeBadge } from "../components/TypeBadge";
import { RootScreenProps } from "../navigation/types";
import { useFavorites } from "../state/FavoritesContext";
import { useProgress } from "../state/ProgressContext";
import { colors, fonts, radius, textColorOn } from "../theme";
import { getTypeInfo } from "../theme/pokemonTypes";
import { formatName, formatNumber } from "../utils/format";

const tabs = [
  { key: "about", label: "Sobre" },
  { key: "stats", label: "Status" },
  { key: "evolution", label: "Evolução" },
] as const;

type TabKey = (typeof tabs)[number]["key"];

const statLabels: Record<string, string> = {
  hp: "HP",
  attack: "Ataque",
  defense: "Defesa",
  "special-attack": "At. Esp.",
  "special-defense": "Def. Esp.",
  speed: "Velocidade",
};

export function PokemonDetailScreen({ route, navigation }: RootScreenProps<"PokemonDetail">) {
  const { id } = route.params;
  const pokemon = usePokemon(id);
  const species = useSpecies(id);
  const { isFavorite, toggleFavorite } = useFavorites();
  const { markSeen } = useProgress();
  const [tab, setTab] = useState<TabKey>("about");

  const types = pokemon.data?.types.map((t) => t.type.name) ?? [];
  const color = getTypeInfo(types[0] ?? "").color;
  const foreground = textColorOn(color);

  useEffect(() => {
    if (pokemon.data) markSeen(id, pokemon.data.types.map((t) => t.type.name));
  }, [id, pokemon.data, markSeen]);

  if (!pokemon.data) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <TopBar>
          <IconButton onPress={() => navigation.goBack()} hitSlop={12}>
            <MaterialCommunityIcons name="arrow-left" size={28} color={colors.text} />
          </IconButton>
        </TopBar>
        {pokemon.isError ? <ErrorMessage onRetry={() => pokemon.refetch()} /> : <Loading />}
      </SafeAreaView>
    );
  }

  return (
    <Container $background={color}>
      <SafeAreaView edges={["top"]}>
        <PokeballWatermark size={240} style={{ right: -50, top: 40 }} />
        <TopBar>
          <IconButton onPress={() => navigation.goBack()} hitSlop={12}>
            <MaterialCommunityIcons name="arrow-left" size={28} color={foreground} />
          </IconButton>
          <IconButton onPress={() => toggleFavorite({ id, name: pokemon.data.name })} hitSlop={12}>
            <MaterialCommunityIcons
              name={isFavorite(id) ? "heart" : "heart-outline"}
              size={28}
              color={foreground}
            />
          </IconButton>
        </TopBar>

        <Heading>
          <NameRow>
            <Name $color={foreground}>{formatName(pokemon.data.name)}</Name>
            <NumberText $color={foreground}>{formatNumber(id)}</NumberText>
          </NameRow>
          <Badges>
            {types.map((type) => (
              <TypeBadge key={type} type={type} variant="onColor" />
            ))}
            <Genus $color={foreground}>{englishGenus(species.data)}</Genus>
          </Badges>
        </Heading>
      </SafeAreaView>

      <Sheet>
        <PokemonArtwork id={id} size={220} style={{ alignSelf: "center", marginTop: -170 }} />

        <Tabs>
          {tabs.map((item) => (
            <TabButton key={item.key} onPress={() => setTab(item.key)} $active={tab === item.key} $color={color}>
              <TabText $active={tab === item.key}>{item.label}</TabText>
            </TabButton>
          ))}
        </Tabs>

        <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
          {tab === "about" && <AboutTab pokemon={pokemon.data} species={species.data} />}
          {tab === "stats" && <StatsTab pokemon={pokemon.data} color={color} />}
          {tab === "evolution" && (
            <EvolutionTab
              chainUrl={species.data?.evolution_chain.url}
              currentId={id}
              onSelect={(nextId) => navigation.push("PokemonDetail", { id: nextId })}
            />
          )}
        </ScrollView>
      </Sheet>
    </Container>
  );
}

function AboutTab({ pokemon, species }: { pokemon: Pokemon; species?: PokemonSpecies }) {
  const abilities = pokemon.abilities
    .filter((a) => !a.is_hidden)
    .map((a) => formatName(a.ability.name))
    .join(", ");

  return (
    <>
      <Body>{englishFlavorText(species)}</Body>
      <InfoGrid>
        <InfoItem>
          <InfoLabel>Altura</InfoLabel>
          <InfoValue>{(pokemon.height / 10).toFixed(1)} m</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>Peso</InfoLabel>
          <InfoValue>{(pokemon.weight / 10).toFixed(1)} kg</InfoValue>
        </InfoItem>
      </InfoGrid>
      <InfoItem>
        <InfoLabel>Habilidades</InfoLabel>
        <InfoValue>{abilities}</InfoValue>
      </InfoItem>
    </>
  );
}

function StatsTab({ pokemon, color }: { pokemon: Pokemon; color: string }) {
  const total = pokemon.stats.reduce((sum, s) => sum + s.base_stat, 0);

  return (
    <>
      {pokemon.stats.map((stat) => (
        <StatRow key={stat.stat.name}>
          <StatLabel>{statLabels[stat.stat.name] ?? stat.stat.name}</StatLabel>
          <StatValue>{stat.base_stat}</StatValue>
          <ProgressBar value={stat.base_stat / 255} color={color} />
        </StatRow>
      ))}
      <StatRow>
        <StatLabel>Total</StatLabel>
        <StatValue>{total}</StatValue>
        <ProgressBar value={total / 720} color={color} />
      </StatRow>
    </>
  );
}

interface EvolutionTabProps {
  chainUrl?: string;
  currentId: number;
  onSelect: (id: number) => void;
}

function EvolutionTab({ chainUrl, currentId, onSelect }: EvolutionTabProps) {
  const chain = useEvolutionChain(chainUrl);

  if (chain.isError) return <ErrorMessage onRetry={() => chain.refetch()} />;
  if (!chain.data) return <Loading />;
  if (chain.data.length === 1) return <Body>Este Pokémon não evolui.</Body>;

  return (
    <>
      {chain.data.map((stage, index) => (
        <Fragment key={index}>
          {index > 0 && (
            <MaterialCommunityIcons
              name="arrow-down"
              size={22}
              color={colors.textMuted}
              style={{ alignSelf: "center", marginVertical: 4 }}
            />
          )}
          <Stage>
            {stage.map((evolution) => (
              <Evolution
                key={evolution.id}
                disabled={evolution.id === currentId}
                $current={evolution.id === currentId}
                onPress={() => onSelect(evolution.id)}
              >
                <PokemonArtwork id={evolution.id} size={72} />
                <EvolutionName>{formatName(evolution.name)}</EvolutionName>
                <EvolutionNumber>{formatNumber(evolution.id)}</EvolutionNumber>
              </Evolution>
            ))}
          </Stage>
        </Fragment>
      ))}
    </>
  );
}

const Container = styled.View<{ $background: string }>`
  flex: 1;
  background-color: ${(p) => p.$background};
`;

const TopBar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 8px 20px;
`;

const IconButton = styled.TouchableOpacity``;

const Heading = styled.View`
  padding: 8px 24px 180px;
`;

const NameRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

const Name = styled.Text<{ $color: string }>`
  flex: 1;
  font-family: ${fonts.bold};
  font-size: 32px;
  color: ${(p) => p.$color};
`;

const NumberText = styled.Text<{ $color: string }>`
  font-family: ${fonts.bold};
  font-size: 18px;
  color: ${(p) => p.$color};
  opacity: 0.7;
  margin-bottom: 8px;
`;

const Badges = styled.View`
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
`;

const Genus = styled.Text<{ $color: string }>`
  font-family: ${fonts.regular};
  font-size: 13px;
  color: ${(p) => p.$color};
  opacity: 0.85;
`;

const Sheet = styled.View`
  flex: 1;
  padding: 0 24px;
  border-top-left-radius: ${radius.xl}px;
  border-top-right-radius: ${radius.xl}px;
  background-color: ${colors.surface};
`;

const Tabs = styled.View`
  flex-direction: row;
  margin: 8px 0 18px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.border};
`;

const TabButton = styled.TouchableOpacity<{ $active: boolean; $color: string }>`
  flex: 1;
  align-items: center;
  padding: 10px 0;
  border-bottom-width: 3px;
  border-bottom-color: ${(p) => (p.$active ? p.$color : "transparent")};
  margin-bottom: -1px;
`;

const TabText = styled.Text<{ $active: boolean }>`
  font-family: ${(p) => (p.$active ? fonts.semibold : fonts.regular)};
  font-size: 15px;
  color: ${(p) => (p.$active ? colors.text : colors.textMuted)};
`;

const Body = styled.Text`
  font-family: ${fonts.regular};
  font-size: 15px;
  line-height: 23px;
  color: ${colors.textMuted};
`;

const InfoGrid = styled.View`
  flex-direction: row;
  gap: 12px;
  margin-top: 18px;
`;

const InfoItem = styled.View`
  flex: 1;
  padding: 14px;
  margin-top: 12px;
  border-radius: ${radius.md}px;
  background-color: ${colors.background};
`;

const InfoLabel = styled.Text`
  font-family: ${fonts.regular};
  font-size: 12px;
  color: ${colors.textMuted};
`;

const InfoValue = styled.Text`
  font-family: ${fonts.semibold};
  font-size: 16px;
  color: ${colors.text};
  margin-top: 2px;
`;

const StatRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 14px;
`;

const StatLabel = styled.Text`
  width: 90px;
  font-family: ${fonts.regular};
  font-size: 14px;
  color: ${colors.textMuted};
`;

const StatValue = styled.Text`
  width: 40px;
  font-family: ${fonts.semibold};
  font-size: 14px;
  color: ${colors.text};
`;

const Stage = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
`;

const Evolution = styled.TouchableOpacity<{ $current: boolean }>`
  width: 104px;
  align-items: center;
  padding: 10px 6px;
  border-radius: ${radius.lg}px;
  border: 2px solid ${(p) => (p.$current ? colors.primary : colors.border)};
  background-color: ${colors.background};
`;

const EvolutionName = styled.Text`
  font-family: ${fonts.semibold};
  font-size: 13px;
  color: ${colors.text};
  text-align: center;
`;

const EvolutionNumber = styled.Text`
  font-family: ${fonts.regular};
  font-size: 11px;
  color: ${colors.textMuted};
`;
