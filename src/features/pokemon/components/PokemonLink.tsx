import type { ReactElement } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "expo-router";
import { useFavorites } from "@/features/favorites/FavoritesProvider";
import { haptics } from "@/lib/haptics";
import { prefetchPokemon } from "../api";
import type { PokemonSummary } from "../logic";

interface PokemonLinkProps {
  pokemon: PokemonSummary;
  // A single pressable element (it receives onPress from the Link).
  children: ReactElement;
}

// Opens the detail screen. On iOS, long-press shows a peek preview and a native context menu.
export function PokemonLink({ pokemon, children }: PokemonLinkProps) {
  const queryClient = useQueryClient();
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(pokemon.id);

  return (
    <Link
      href={{ pathname: "/pokemon/[id]", params: { id: pokemon.id } }}
      asChild
      onPressIn={() => prefetchPokemon(queryClient, pokemon.id)}
    >
      <Link.Trigger>{children}</Link.Trigger>
      <Link.Preview />
      <Link.Menu>
        <Link.MenuAction
          title={favorite ? "Remover dos favoritos" : "Favoritar"}
          icon={favorite ? "heart.slash" : "heart"}
          onPress={() => {
            haptics.tap();
            toggleFavorite(pokemon);
          }}
        />
      </Link.Menu>
    </Link>
  );
}
