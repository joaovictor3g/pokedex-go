import React, { useEffect, useState } from "react";
import { Footer } from "../../components/Footer";
import { Container, Header, Text, PokemonContainer } from "./styles";
import { Feather } from "@expo/vector-icons";
import { Alert, StatusBar, View } from "react-native";

import { PokemonProps } from "../PokeList";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import {
  getPokemonsAddedToFavorites,
  removePokemonOfAsyncStorage,
} from "../../libs/storage";
import { PokemonFavoriteBox } from "../../components/PokemonFavoriteBox ";
import { Loading } from "../../components/Loading";

export function Favorites() {
  const [pokemons, setPokemons] = useState<PokemonProps[]>([]);
  const [isLoadind, setIsLoading] = useState(true);
  const isFocused = useIsFocused();

  const { navigate } = useNavigation();

  function handleNavigateToDetail(id: number) {
    navigate("/pokelist/detail", { id });
  }

  async function getFavoritePokemons() {
    try {
      const favoritePokemons = await getPokemonsAddedToFavorites();

      setPokemons(favoritePokemons.data);

      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  function handleRemovePokemon(pokemon: PokemonProps) {
    try {
      removePokemonOfAsyncStorage(pokemon);

      setPokemons(pokemons.filter((item) => item.id !== pokemon.id));
    } catch (err) {
      Alert.alert("Error");
    }
  }

  useEffect(() => {
    getFavoritePokemons();
  }, [isFocused]);

  if (isLoadind) {
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
        <Header>
          <Text color="#000" size={24} fontWeight="bold">
            Favoritos
          </Text>
          <Feather name="more-vertical" size={24} color="black" />
        </Header>

        <PokemonContainer>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}
            contentContainerStyle={{ width: "100%" }}
          >
            {pokemons.map((pokemon) => (
              <View
                key={pokemon.name}
                style={{
                  marginBottom: 15,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.8,
                  shadowRadius: 2,
                  elevation: 1,
                }}
              >
                <PokemonFavoriteBox
                  handleRemovePokemon={() => handleRemovePokemon(pokemon)}
                  padding={20}
                  background="#fff"
                  color="#000"
                  index={pokemon.id ?? 1}
                  pokemon={pokemon}
                  handleNavigateToDetail={handleNavigateToDetail}
                  width={100}
                  imageSize={300}
                />
              </View>
            ))}
          </ScrollView>
        </PokemonContainer>
      </Container>
      <Footer currentPage="favorites" />
    </>
  );
}
