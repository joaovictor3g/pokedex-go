import React, { useEffect, useState } from "react";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { Footer } from "../../components/Footer";
import { SearchPokemon } from "../../components/SearchPokemon";
import api from "../../services/api";
import {
  Button,
  Container,
  PokemonContainer,
  Search,
  SearchContainer,
} from "./styles";
import { FlatList, View } from "react-native";
import typesInJSON from "../../../types.json";
import { PokemonBox } from "../../components/PokemonBox";
import { ActivityIndicator } from "react-native";
import { Loading } from "../../components/Loading";

import { EvilIcons } from "@expo/vector-icons";

export interface PokemonProps {
  name: string;
  url?: string;
  id?: number;
}

export function PokeList() {
  const [pokemons, setPokemons] = useState<PokemonProps[]>([]);
  const [color, setColor] = useState("");
  const { navigate } = useNavigation();

  const [pokemonSearched, setPokemonSearched] = useState("");
  const [limit, setLimit] = useState(8);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [isButtonSearchPressed, setIsButtonSearchPressed] = useState(false);

  async function renderPokemons() {
    try {
      const response = await api.get(
        `/pokemon?offset=${offset}&limit=${limit}`
      );

      setPokemons([...pokemons, ...response.data.results]);

      setOffset(offset + limit);

      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  function handleNavigateToDetail(id: number) {
    navigate("/pokelist/detail", { id });
  }

  function handleSearchPokemon() {
    setIsButtonSearchPressed(true);
  }

  useEffect(() => {
    renderPokemons();

    return () => {
      setPokemons([]);
      setOffset(0);
    };
  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loading />
      </View>
    );
  }

  return (
    <>
      <Container>
        <SearchContainer>
          <Search
            value={pokemonSearched}
            onChangeText={(value) => setPokemonSearched(value)}
            placeholder="Pesquisar"
          />
          <Button onPress={handleSearchPokemon}>
            <EvilIcons name="search" size={30} color="#666" />
          </Button>
        </SearchContainer>

        <PokemonContainer>
          {!isButtonSearchPressed ? (
            <FlatList
              // style={{ flex: 1 }}
              contentContainerStyle={{
                justifyContent: "center",
                alignItems: "center",
              }}
              data={pokemons}
              renderItem={({ item, index }) => (
                <PokemonBox
                  key={item.name}
                  background=""
                  color={color}
                  handleNavigateToDetail={handleNavigateToDetail}
                  index={index + 1}
                  pokemon={item}
                />
              )}
              keyExtractor={(item) => item.name}
              onEndReached={renderPokemons}
              onEndReachedThreshold={0.02}
              ListFooterComponent={() => (
                <ActivityIndicator size="large" color="blue" />
              )}
              numColumns={2}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <SearchPokemon pokemonSearched={pokemonSearched} />
          )}
        </PokemonContainer>
      </Container>
      <Footer currentPage="pokelist" />
    </>
  );
}
