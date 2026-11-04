import React, { createContext, ReactNode, useCallback, useContext, useMemo } from "react";
import { PokemonSummary } from "../api/pokeapi";
import { usePersistentState } from "./usePersistentState";

interface FavoritesContextValue {
  favorites: PokemonSummary[];
  isFavorite: (id: number) => boolean;
  toggleFavorite: (pokemon: PokemonSummary) => void;
  removeFavorite: (id: number) => void;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = usePersistentState<PokemonSummary[]>(
    "@pokedexgo:favorites",
    []
  );

  const ids = useMemo(() => new Set(favorites.map((p) => p.id)), [favorites]);

  const removeFavorite = useCallback(
    (id: number) => setFavorites((list) => list.filter((p) => p.id !== id)),
    [setFavorites]
  );

  const toggleFavorite = useCallback(
    (pokemon: PokemonSummary) =>
      setFavorites((list) =>
        list.some((p) => p.id === pokemon.id)
          ? list.filter((p) => p.id !== pokemon.id)
          : [...list, { id: pokemon.id, name: pokemon.name }].sort((a, b) => a.id - b.id)
      ),
    [setFavorites]
  );

  const value = useMemo(
    () => ({ favorites, isFavorite: (id: number) => ids.has(id), toggleFavorite, removeFavorite }),
    [favorites, ids, toggleFavorite, removeFavorite]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("useFavorites must be used inside FavoritesProvider");
  return context;
}
