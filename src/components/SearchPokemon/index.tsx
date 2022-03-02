import React, { useEffect, useState } from "react";
import { PokemonProps } from "../../pages/PokeList";
import api from "../../services/api";
import { PokemonBox } from "../PokemonBox";
import { Container } from "./styles";

interface SearchProps {
  pokemonSearched: string;
}

export function SearchPokemon({ pokemonSearched }: SearchProps) {
  const [pokemon, setPokemon] = useState({} as PokemonProps);
  console.log(pokemonSearched);

  useEffect(() => {
    api
      .get(`/pokemon/${pokemonSearched}`)
      .then((res) => {
        console.log(res.data.results);
        setPokemon(res.data.results);
      })
      .catch((err) => console.log(err));
  }, [pokemonSearched]);

  return (
    <PokemonBox
      color="#fff"
      handleNavigateToDetail={() => {}}
      index={1}
      pokemon={pokemon}
    />
  );
}
