import { createContext, useContext, type ReactNode } from "react";
import type { PokemonSummary } from "@/features/pokemon/logic";
import { usePersistentState } from "@/lib/usePersistentState";
import { toggleIn } from "./logic";

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
    [],
  );
  const ids = new Set(favorites.map((p) => p.id));

  const value: FavoritesContextValue = {
    favorites,
    isFavorite: (id) => ids.has(id),
    toggleFavorite: (pokemon) => setFavorites((list) => toggleIn(list, pokemon)),
    removeFavorite: (id) => setFavorites((list) => list.filter((p) => p.id !== id)),
  };

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("useFavorites must be used inside FavoritesProvider");
  return context;
}
