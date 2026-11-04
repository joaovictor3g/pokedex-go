import { useEffect, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFavorites } from "@/features/favorites/FavoritesProvider";
import { usePokemon, useSpecies } from "@/features/pokemon/api";
import { Artwork } from "@/features/pokemon/components/Artwork";
import { EvolutionChain } from "@/features/pokemon/components/EvolutionChain";
import { StatBars } from "@/features/pokemon/components/StatBars";
import { TypeBadge } from "@/features/pokemon/components/TypeBadge";
import {
  englishFlavorText,
  englishGenus,
  typeNamesOf,
  type Pokemon,
  type PokemonSpecies,
} from "@/features/pokemon/logic";
import { useProgress } from "@/features/progress/ProgressProvider";
import { formatName, formatNumber } from "@/lib/format";
import { haptics } from "@/lib/haptics";
import { shade, textColorOn, useThemeColors } from "@/theme/colors";
import { getTypeInfo } from "@/theme/pokemonTypes";
import { ErrorMessage, Loading } from "@/ui/Feedback";
import { Gradient } from "@/ui/Gradient";
import { Icon, type IconName } from "@/ui/Icon";
import { PokeballWatermark } from "@/ui/PokeballWatermark";
import { SegmentedControl } from "@/ui/SegmentedControl";
import { Text } from "@/ui/Text";

const sections = ["Sobre", "Status", "Evolução"] as const;

const ARTWORK_SIZE = 230;
const ARTWORK_OVERLAP = 150; // how far the artwork rises above the white sheet
const SHEET_OVERLAP = 40; // how far the sheet rises over the gradient

export default function PokemonDetailScreen() {
  const id = Number(useLocalSearchParams<{ id: string }>().id);
  const pokemon = usePokemon(id);
  const species = useSpecies(id);
  const { markSeen } = useProgress();
  const { isFavorite, toggleFavorite } = useFavorites();
  const theme = useThemeColors();
  const insets = useSafeAreaInsets();
  const [section, setSection] = useState(0);

  const types = typeNamesOf(pokemon.data);
  const color = getTypeInfo(types[0]).color;
  const foreground = pokemon.data ? textColorOn(color) : theme.ink;
  const favorite = isFavorite(id);

  useEffect(() => {
    if (pokemon.data) markSeen(id, typeNamesOf(pokemon.data));
  }, [id, pokemon.data, markSeen]);

  const header = (
    <Stack.Screen
      options={{
        headerTintColor: foreground,
        // The gradient sits under the transparent header; iOS 26's fade would hide the name.
        scrollEdgeEffects: { top: "hidden" },
        headerRight: pokemon.data
          ? () => (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={favorite ? "Remover dos favoritos" : "Favoritar"}
                hitSlop={10}
                onPress={() => {
                  haptics.tap();
                  toggleFavorite({ id, name: pokemon.data.name });
                }}
              >
                <Icon name={favorite ? "heart.fill" : "heart"} size={20} color={foreground} />
              </Pressable>
            )
          : undefined,
      }}
    />
  );

  if (!pokemon.data) {
    return (
      <View className="flex-1 bg-canvas dark:bg-canvas-dark">
        {header}
        {pokemon.isError ? <ErrorMessage onRetry={() => pokemon.refetch()} /> : <Loading />}
      </View>
    );
  }

  return (
    <View className="flex-1 bg-card dark:bg-card-dark">
      {header}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="grow">
        <Gradient
          colors={[shade(color, -0.1), color, shade(color, 0.22)]}
          className="overflow-hidden px-6"
          // Bottom padding keeps the badges clear of the artwork, which overlaps the sheet by
          // ARTWORK_OVERLAP and the sheet overlaps the gradient by SHEET_OVERLAP.
          style={{
            paddingTop: insets.top + 68,
            paddingBottom: ARTWORK_OVERLAP + SHEET_OVERLAP + 14,
          }}
        >
          <PokeballWatermark size={260} style={{ right: -60, top: insets.top + 30 }} />
          <View className="flex-row items-end justify-between">
            <Text color={foreground} className="flex-1 text-[34px] font-extrabold tracking-tight">
              {formatName(pokemon.data.name)}
            </Text>
            <Text color={foreground} className="mb-2 text-lg font-bold opacity-70">
              {formatNumber(id)}
            </Text>
          </View>
          <View className="flex-row flex-wrap items-center gap-2">
            {types.map((type) => (
              <TypeBadge key={type} type={type} variant="onColor" />
            ))}
            <Text color={foreground} className="text-[13px] opacity-85">
              {englishGenus(species.data)}
            </Text>
          </View>
        </Gradient>

        <View
          className="flex-1 rounded-t-[36px] bg-card px-6 dark:bg-card-dark"
          style={{ marginTop: -SHEET_OVERLAP, paddingBottom: insets.bottom + 32 }}
        >
          <View className="items-center" style={{ marginTop: -ARTWORK_OVERLAP }}>
            <Artwork id={id} size={ARTWORK_SIZE} />
          </View>

          <View className="mb-5 mt-2">
            <SegmentedControl values={sections} selectedIndex={section} onChange={setSection} />
          </View>

          {section === 0 && <About pokemon={pokemon.data} species={species.data} />}
          {section === 1 && <StatBars pokemon={pokemon.data} color={color} />}
          {section === 2 && (
            <EvolutionChain chainUrl={species.data?.evolution_chain.url} currentId={id} />
          )}
        </View>
      </ScrollView>
    </View>
  );
}

function About({ pokemon, species }: { pokemon: Pokemon; species: PokemonSpecies | undefined }) {
  const abilities = pokemon.abilities.map(
    (a) => formatName(a.ability.name) + (a.is_hidden ? " (oculta)" : ""),
  );

  return (
    <View className="gap-4">
      <Text variant="secondary">{englishFlavorText(species)}</Text>
      <View className="flex-row gap-3">
        <InfoTile icon="ruler" label="Altura" value={`${(pokemon.height / 10).toFixed(1)} m`} />
        <InfoTile icon="weight" label="Peso" value={`${(pokemon.weight / 10).toFixed(1)} kg`} />
      </View>
      <InfoTile icon="bolt" label="Habilidades" value={abilities.join(", ")} />
    </View>
  );
}

function InfoTile({ icon, label, value }: { icon: IconName; label: string; value: string }) {
  const theme = useThemeColors();
  return (
    <View className="flex-1 gap-1 rounded-2xl bg-canvas p-4 dark:bg-canvas-dark">
      <View className="flex-row items-center gap-1.5">
        <Icon name={icon} size={13} color={theme.muted} />
        <Text variant="caption">{label}</Text>
      </View>
      <Text className="text-base font-semibold">{value}</Text>
    </View>
  );
}
