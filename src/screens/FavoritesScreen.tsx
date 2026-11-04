import React from "react";
import { FlatList } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { PokemonSummary, usePokemon } from "../api/pokeapi";
import { Message } from "../components/Feedback";
import { PokeballWatermark } from "../components/PokeballWatermark";
import { PokemonArtwork } from "../components/PokemonArtwork";
import { TypeBadge } from "../components/TypeBadge";
import { TabScreenProps } from "../navigation/types";
import { useFavorites } from "../state/FavoritesContext";
import { colors, fonts, radius, textColorOn } from "../theme";
import { getTypeInfo } from "../theme/pokemonTypes";
import { formatName, formatNumber } from "../utils/format";

export function FavoritesScreen({ navigation }: TabScreenProps<"Favorites">) {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <Header>
        <Title>Favoritos</Title>
        {favorites.length > 0 && <Subtitle>Deslize para a esquerda para remover</Subtitle>}
      </Header>

      <FlatList
        data={favorites}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ padding: 20, paddingTop: 8, gap: 12, flexGrow: 1 }}
        renderItem={({ item }) => (
          <FavoriteRow
            pokemon={item}
            onPress={() => navigation.navigate("PokemonDetail", { id: item.id })}
            onRemove={() => removeFavorite(item.id)}
          />
        )}
        ListEmptyComponent={
          <Message
            icon="heart-outline"
            title="Nenhum favorito ainda"
            message="Toque no coração de um Pokémon para guardá-lo aqui."
            actionLabel="Explorar a Pokédex"
            onAction={() => navigation.navigate("PokeList")}
          />
        }
      />
    </SafeAreaView>
  );
}

interface FavoriteRowProps {
  pokemon: PokemonSummary;
  onPress: () => void;
  onRemove: () => void;
}

function FavoriteRow({ pokemon, onPress, onRemove }: FavoriteRowProps) {
  const { data } = usePokemon(pokemon.id);
  const types = data?.types.map((t) => t.type.name) ?? [];
  const background = getTypeInfo(types[0] ?? "").color;
  const foreground = textColorOn(background);

  return (
    <ReanimatedSwipeable
      friction={2}
      rightThreshold={60}
      overshootRight={false}
      renderRightActions={() => (
        <RemoveAction onPress={onRemove}>
          <MaterialCommunityIcons name="trash-can-outline" size={26} color={colors.white} />
          <RemoveText>Remover</RemoveText>
        </RemoveAction>
      )}
    >
      <Row $background={background} onPress={onPress} activeOpacity={0.9}>
        <PokeballWatermark size={130} style={{ right: 10, top: -20 }} />
        <RowInfo>
          <RowNumber $color={foreground}>{formatNumber(pokemon.id)}</RowNumber>
          <RowName $color={foreground}>{formatName(pokemon.name)}</RowName>
          <RowTypes>
            {types.map((type) => (
              <TypeBadge key={type} type={type} variant="onColor" compact />
            ))}
          </RowTypes>
        </RowInfo>
        <PokemonArtwork id={pokemon.id} size={96} />
      </Row>
    </ReanimatedSwipeable>
  );
}

const Header = styled.View`
  padding: 12px 20px 4px;
`;

const Title = styled.Text`
  font-family: ${fonts.bold};
  font-size: 28px;
  color: ${colors.text};
`;

const Subtitle = styled.Text`
  font-family: ${fonts.regular};
  font-size: 13px;
  color: ${colors.textMuted};
`;

const Row = styled.TouchableOpacity<{ $background: string }>`
  flex-direction: row;
  align-items: center;
  height: 112px;
  padding: 0 12px 0 18px;
  border-radius: ${radius.lg}px;
  overflow: hidden;
  background-color: ${(p) => p.$background};
`;

const RowInfo = styled.View`
  flex: 1;
`;

const RowNumber = styled.Text<{ $color: string }>`
  font-family: ${fonts.bold};
  font-size: 12px;
  color: ${(p) => p.$color};
  opacity: 0.7;
`;

const RowName = styled.Text<{ $color: string }>`
  font-family: ${fonts.bold};
  font-size: 20px;
  color: ${(p) => p.$color};
`;

const RowTypes = styled.View`
  flex-direction: row;
  gap: 6px;
  margin-top: 4px;
`;

const RemoveAction = styled.TouchableOpacity`
  width: 96px;
  margin-left: 12px;
  align-items: center;
  justify-content: center;
  border-radius: ${radius.lg}px;
  background-color: ${colors.primary};
`;

const RemoveText = styled.Text`
  font-family: ${fonts.medium};
  font-size: 12px;
  color: ${colors.white};
  margin-top: 2px;
`;
