import React, { useCallback, useMemo, useState } from "react";
import { FlatList } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { PokemonSummary, usePokemonIndex } from "../api/pokeapi";
import { ErrorMessage, Loading, Message } from "../components/Feedback";
import { PokemonCard } from "../components/PokemonCard";
import { TabScreenProps } from "../navigation/types";
import { colors, fonts, radius } from "../theme";

// Matches by name ("char", "mr-mime" as "mr mime") or by number ("25", "#025").
function matches(pokemon: PokemonSummary, query: string) {
  const number = query.replace(/^#/, "");
  if (/^\d+$/.test(number)) return String(pokemon.id).startsWith(String(Number(number)));
  return pokemon.name.replace(/-/g, " ").includes(query.toLowerCase());
}

export function PokeListScreen({ navigation }: TabScreenProps<"PokeList">) {
  const index = usePokemonIndex();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const trimmed = query.trim();
    const all = index.data ?? [];
    return trimmed ? all.filter((p) => matches(p, trimmed)) : all;
  }, [index.data, query]);

  const openDetail = useCallback(
    (pokemon: PokemonSummary) => navigation.navigate("PokemonDetail", { id: pokemon.id }),
    [navigation]
  );

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <Header>
        <Title>Pokédex</Title>
        <Subtitle>{index.data ? `${index.data.length} Pokémon para descobrir` : " "}</Subtitle>
        <SearchBox>
          <MaterialCommunityIcons name="magnify" size={22} color={colors.textMuted} />
          <SearchInput
            value={query}
            onChangeText={setQuery}
            placeholder="Buscar por nome ou número"
            placeholderTextColor={colors.textMuted}
            autoCorrect={false}
            autoCapitalize="none"
            clearButtonMode="while-editing"
          />
        </SearchBox>
      </Header>

      {index.isError ? (
        <ErrorMessage onRetry={() => index.refetch()} />
      ) : !index.data ? (
        <Loading />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => String(item.id)}
          numColumns={2}
          contentContainerStyle={{ paddingHorizontal: 14, paddingBottom: 24, flexGrow: 1 }}
          renderItem={({ item }) => <PokemonCard pokemon={item} onPress={openDetail} />}
          keyboardDismissMode="on-drag"
          initialNumToRender={12}
          windowSize={7}
          ListEmptyComponent={
            <Message
              icon="pokeball"
              title="Nenhum Pokémon encontrado"
              message={`Nada corresponde a "${query.trim()}".`}
            />
          }
        />
      )}
    </SafeAreaView>
  );
}

const Header = styled.View`
  padding: 12px 20px 8px;
`;

const Title = styled.Text`
  font-family: ${fonts.bold};
  font-size: 28px;
  color: ${colors.text};
`;

const Subtitle = styled.Text`
  font-family: ${fonts.regular};
  font-size: 14px;
  color: ${colors.textMuted};
`;

const SearchBox = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin-top: 14px;
  padding: 0 14px;
  border-radius: ${radius.md}px;
  background-color: ${colors.surface};
  border: 1px solid ${colors.border};
`;

const SearchInput = styled.TextInput`
  flex: 1;
  padding: 12px 0;
  font-family: ${fonts.regular};
  font-size: 15px;
  color: ${colors.text};
`;
