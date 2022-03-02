import AsyncStorage from "@react-native-async-storage/async-storage";

interface PokemonProps {
  name: string;
  url?: string;
  id?: number;
}

interface StoragePokemonProps {
  data: PokemonProps[];
}

export async function savePokemon(pokemon: PokemonProps) {
  try {
    let pokemons = {} as StoragePokemonProps;
    const response = await AsyncStorage.getItem("@pokedexgo:favorites");

    if (response) {
      const pokemonsAlreadySaved = JSON.parse(response);

      pokemons = {
        data: [...pokemonsAlreadySaved.data, pokemon],
      };
    } else {
      pokemons = {
        data: [pokemon],
      };
    }

    await AsyncStorage.setItem(
      "@pokedexgo:favorites",
      JSON.stringify(pokemons)
    );
  } catch (err: any) {
    throw new Error(err);
  }
}

export async function getPokemonsAddedToFavorites(): Promise<StoragePokemonProps> {
  try {
    const response = await AsyncStorage.getItem("@pokedexgo:favorites");

    if (response) {
      const pokemons = JSON.parse(response) as StoragePokemonProps;

      return pokemons;
    }

    return {
      data: [],
    };
  } catch (err: any) {
    throw new Error(err);
  }
}

export async function removePokemonOfAsyncStorage(pokemon: PokemonProps) {
  try {
    let pokemons = {} as StoragePokemonProps;
    const response = await getPokemonsAddedToFavorites();

    if (response) {
      const newPokemonList = response.data.filter(
        (item) => item.id !== pokemon.id
      );

      pokemons = {
        data: newPokemonList,
      };

      await AsyncStorage.setItem(
        "@pokedexgo:favorites",
        JSON.stringify(pokemons)
      );

      return;
    }
  } catch (err: any) {
    throw new Error(err);
  }
}
