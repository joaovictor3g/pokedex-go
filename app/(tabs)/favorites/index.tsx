import type { ReactNode } from "react";
import { FlatList, Pressable, View, type PressableProps } from "react-native";
import { Stack, router } from "expo-router";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { useFavorites } from "@/features/favorites/FavoritesProvider";
import { usePokemon } from "@/features/pokemon/api";
import { Artwork } from "@/features/pokemon/components/Artwork";
import { PokemonLink } from "@/features/pokemon/components/PokemonLink";
import { TypeBadge } from "@/features/pokemon/components/TypeBadge";
import { typeNamesOf, type PokemonSummary } from "@/features/pokemon/logic";
import { formatName, formatNumber } from "@/lib/format";
import { haptics } from "@/lib/haptics";
import { palette, shade, textColorOn } from "@/theme/colors";
import { getTypeInfo } from "@/theme/pokemonTypes";
import { Message } from "@/ui/Feedback";
import { Gradient } from "@/ui/Gradient";
import { Icon } from "@/ui/Icon";
import { PokeballWatermark } from "@/ui/PokeballWatermark";
import { Text } from "@/ui/Text";

export default function FavoritesScreen() {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <>
      <Stack.Screen options={{ title: "Favoritos" }} />
      <FlatList
        data={favorites}
        keyExtractor={(item) => String(item.id)}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerClassName="grow gap-3 px-5 pb-8 pt-2"
        ListHeaderComponent={
          favorites.length > 0 ? (
            <Text variant="caption" className="mb-1">
              Deslize para a esquerda para remover · segure para mais opções
            </Text>
          ) : undefined
        }
        renderItem={({ item }) => (
          <FavoriteRow pokemon={item} onRemove={() => removeFavorite(item.id)} />
        )}
        ListEmptyComponent={
          <Message
            icon="heart"
            title="Nenhum favorito ainda"
            message="Toque no coração de um Pokémon para guardá-lo aqui."
            actionLabel="Explorar a Pokédex"
            onAction={() => router.navigate("/pokedex")}
          />
        }
      />
    </>
  );
}

function FavoriteRow({ pokemon, onRemove }: { pokemon: PokemonSummary; onRemove: () => void }) {
  const { data } = usePokemon(pokemon.id);
  const types = typeNamesOf(data);
  const color = getTypeInfo(types[0]).color;
  const foreground = textColorOn(color);

  return (
    <ReanimatedSwipeable
      friction={2}
      rightThreshold={60}
      overshootRight={false}
      renderRightActions={() => (
        <Pressable
          onPress={() => {
            haptics.tap();
            onRemove();
          }}
          accessibilityRole="button"
          accessibilityLabel={`Remover ${formatName(pokemon.name)}`}
          className="ml-3 w-24 items-center justify-center gap-0.5 rounded-3xl bg-brand active:opacity-80"
        >
          <Icon name="trash" size={22} color={palette.white} />
          <Text color={palette.white} className="text-xs font-medium">
            Remover
          </Text>
        </Pressable>
      )}
    >
      <PokemonLink pokemon={pokemon}>
        <RowPressable color={color}>
          <PokeballWatermark size={140} style={{ right: 6, top: -24 }} />
          <View className="flex-1 gap-0.5">
            <Text color={foreground} className="text-xs font-bold opacity-70">
              {formatNumber(pokemon.id)}
            </Text>
            <Text color={foreground} className="text-xl font-bold">
              {formatName(pokemon.name)}
            </Text>
            <View className="mt-1 flex-row gap-1.5">
              {types.map((type) => (
                <TypeBadge key={type} type={type} variant="onColor" size="sm" />
              ))}
            </View>
          </View>
          <Artwork id={pokemon.id} size={96} />
        </RowPressable>
      </PokemonLink>
    </ReanimatedSwipeable>
  );
}

function RowPressable({
  color,
  children,
  ...props
}: Omit<PressableProps, "children"> & { color: string; children: ReactNode }) {
  return (
    <Pressable {...props} className="overflow-hidden rounded-3xl active:opacity-90">
      <Gradient
        colors={[color, shade(color, 0.2)]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="h-28 flex-row items-center pl-5 pr-3"
      >
        {children}
      </Gradient>
    </Pressable>
  );
}
