import { Pressable, ScrollView, View } from "react-native";
import { Stack, router } from "expo-router";
import { useFavorites } from "@/features/favorites/FavoritesProvider";
import { usePokemon, useSpecies } from "@/features/pokemon/api";
import { Artwork } from "@/features/pokemon/components/Artwork";
import { PokemonLink } from "@/features/pokemon/components/PokemonLink";
import { TypeBadge } from "@/features/pokemon/components/TypeBadge";
import {
  englishFlavorText,
  englishGenus,
  pokemonOfTheDay,
  typeNamesOf,
} from "@/features/pokemon/logic";
import { useProgress } from "@/features/progress/ProgressProvider";
import { useTrainer } from "@/features/trainer/TrainerProvider";
import { formatName, formatNumber } from "@/lib/format";
import { haptics } from "@/lib/haptics";
import { palette, shade, textColorOn } from "@/theme/colors";
import { getTypeInfo } from "@/theme/pokemonTypes";
import { ErrorMessage, Loading } from "@/ui/Feedback";
import { GlassButton } from "@/ui/Glass";
import { Gradient } from "@/ui/Gradient";
import { Icon } from "@/ui/Icon";
import { PokeballWatermark } from "@/ui/PokeballWatermark";
import { Text } from "@/ui/Text";

export default function HomeScreen() {
  const { trainer } = useTrainer();
  const id = pokemonOfTheDay(new Date());

  return (
    <>
      <Stack.Screen options={{ title: `Olá, ${trainer?.name.split(" ")[0] ?? "treinador"}` }} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerClassName="gap-5 px-5 pb-10 pt-2"
        showsVerticalScrollIndicator={false}
      >
        <Text variant="secondary" className="-mb-2">
          Seu Pokémon do dia
        </Text>
        <DailyPokemon id={id} />
        <Summary />
        <RecentlySeen />
      </ScrollView>
    </>
  );
}

function DailyPokemon({ id }: { id: number }) {
  const pokemon = usePokemon(id);
  const species = useSpecies(id);
  const { isFavorite, toggleFavorite } = useFavorites();

  if (pokemon.isError) return <ErrorMessage onRetry={() => pokemon.refetch()} />;
  if (!pokemon.data) return <Loading />;

  const types = typeNamesOf(pokemon.data);
  const color = getTypeInfo(types[0]).color;
  const foreground = textColorOn(color);
  const favorite = isFavorite(id);
  const summary = { id, name: pokemon.data.name };

  return (
    <>
      <Gradient
        colors={[color, shade(color, 0.25)]}
        className="h-[300px] overflow-hidden rounded-[32px] p-5"
      >
        <PokeballWatermark size={240} style={{ right: -50, top: -30 }} />
        <Text color={foreground} className="text-base font-bold opacity-70">
          {formatNumber(id)}
        </Text>
        <Text color={foreground} className="text-[34px] font-extrabold tracking-tight">
          {formatName(pokemon.data.name)}
        </Text>
        <Text color={foreground} className="mb-2.5 text-[13px] opacity-85">
          {englishGenus(species.data)}
        </Text>
        <View className="gap-1.5">
          {types.map((type) => (
            <TypeBadge key={type} type={type} variant="onColor" />
          ))}
        </View>
        <Artwork id={id} size={190} style={{ position: "absolute", right: 4, bottom: 44 }} />

        {/* Liquid Glass controls floating over the artwork. */}
        <View className="absolute bottom-4 left-4 right-4 flex-row gap-2.5">
          <GlassButton
            accessibilityLabel={favorite ? "Remover dos favoritos" : "Favoritar"}
            onPress={() => {
              haptics.tap();
              toggleFavorite(summary);
            }}
            className="h-12 w-12"
          >
            <Icon name={favorite ? "heart.fill" : "heart"} size={20} color={foreground} />
          </GlassButton>
          <View className="flex-1">
            <GlassButton
              accessibilityLabel="Ver detalhes"
              onPress={() => router.push({ pathname: "/pokemon/[id]", params: { id } })}
              className="h-12 flex-row gap-1.5 px-5"
            >
              <Text color={foreground} className="text-[15px] font-semibold">
                Ver detalhes
              </Text>
              <Icon name="chevronRight" size={14} color={foreground} />
            </GlassButton>
          </View>
        </View>
      </Gradient>

      {species.data && (
        <View className="gap-1.5 rounded-3xl bg-card p-5 dark:bg-card-dark">
          <Text variant="headline">Sobre</Text>
          <Text variant="secondary">{englishFlavorText(species.data)}</Text>
        </View>
      )}
    </>
  );
}

function Summary() {
  const { favorites } = useFavorites();
  const { level, seenCount } = useProgress();
  const items = [
    { label: "Vistos", value: seenCount, onPress: () => router.navigate("/pokedex") },
    { label: "Favoritos", value: favorites.length, onPress: () => router.navigate("/favorites") },
    { label: "Nível", value: level, onPress: () => router.navigate("/profile") },
  ];

  return (
    <View className="flex-row gap-3">
      {items.map((item) => (
        <Pressable
          key={item.label}
          onPress={item.onPress}
          className="flex-1 items-center rounded-3xl bg-card py-4 active:opacity-80 dark:bg-card-dark"
          accessibilityRole="button"
        >
          <Text color={palette.brand} className="text-2xl font-extrabold">
            {item.value}
          </Text>
          <Text variant="caption">{item.label}</Text>
        </Pressable>
      ))}
    </View>
  );
}

function RecentlySeen() {
  const { recent } = useProgress();
  const ids = recent(10);
  if (ids.length === 0) return null;

  return (
    <View className="gap-2.5">
      <Text variant="headline">Vistos recentemente</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="gap-3"
      >
        {ids.map((id) => (
          <RecentItem key={id} id={id} />
        ))}
      </ScrollView>
    </View>
  );
}

function RecentItem({ id }: { id: number }) {
  const { data } = usePokemon(id);
  const color = getTypeInfo(typeNamesOf(data)[0]).color;

  return (
    <PokemonLink pokemon={{ id, name: data?.name ?? "" }}>
      <Pressable className="items-center gap-1 active:opacity-80" accessibilityLabel={data?.name}>
        <View
          className="h-20 w-20 items-center justify-center rounded-full"
          style={{ backgroundColor: `${color}33` }}
        >
          <Artwork id={id} size={64} />
        </View>
        <Text variant="caption">{formatNumber(id)}</Text>
      </Pressable>
    </PokemonLink>
  );
}
