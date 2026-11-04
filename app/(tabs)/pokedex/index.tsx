import { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Stack } from "expo-router";
import { usePokemonIndex, useTypeMembers } from "@/features/pokemon/api";
import { PokemonCard } from "@/features/pokemon/components/PokemonCard";
import { TypeIcon } from "@/features/pokemon/components/TypeBadge";
import { matchesQuery } from "@/features/pokemon/logic";
import { haptics } from "@/lib/haptics";
import { palette, textColorOn } from "@/theme/colors";
import { getTypeInfo, typeNames, type PokemonTypeName } from "@/theme/pokemonTypes";
import { ErrorMessage, Loading, Message } from "@/ui/Feedback";
import { Text } from "@/ui/Text";

export default function PokedexScreen() {
  const index = usePokemonIndex();
  const [query, setQuery] = useState("");
  const [type, setType] = useState<PokemonTypeName | null>(null);
  const members = useTypeMembers(type);

  const results = (index.data ?? []).filter(
    (pokemon) => matchesQuery(pokemon, query) && (!type || members.data?.has(pokemon.id)),
  );
  const filtering = !!type && !members.data;

  return (
    <>
      <Stack.Screen
        options={{
          title: "Pokédex",
          headerSearchBarOptions: {
            placeholder: "Nome ou número",
            autoCapitalize: "none",
            hideWhenScrolling: false,
            onChangeText: (event) => setQuery(event.nativeEvent.text),
            onCancelButtonPress: () => setQuery(""),
          },
        }}
      />
      {index.isError ? (
        <ErrorMessage onRetry={() => index.refetch()} />
      ) : !index.data || filtering ? (
        <Loading />
      ) : (
        <FlashList
          data={results}
          numColumns={2}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <PokemonCard pokemon={item} />}
          contentInsetAdjustmentBehavior="automatic"
          keyboardDismissMode="on-drag"
          contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 24 }}
          ListHeaderComponent={
            <TypeFilter selected={type} onSelect={setType} count={results.length} />
          }
          ListEmptyComponent={
            <Message
              icon="search"
              title="Nenhum Pokémon encontrado"
              message="Tente outro nome, número ou tipo."
            />
          }
        />
      )}
    </>
  );
}

interface TypeFilterProps {
  selected: PokemonTypeName | null;
  onSelect: (type: PokemonTypeName | null) => void;
  count: number;
}

function TypeFilter({ selected, onSelect, count }: TypeFilterProps) {
  return (
    <View className="gap-2 pb-2">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="gap-2 px-1.5"
      >
        <Chip
          label="Todos"
          active={!selected}
          color={palette.brand}
          onPress={() => onSelect(null)}
        />
        {typeNames.map((name) => (
          <Chip
            key={name}
            type={name}
            label={getTypeInfo(name).label}
            active={selected === name}
            color={getTypeInfo(name).color}
            onPress={() => onSelect(selected === name ? null : name)}
          />
        ))}
      </ScrollView>
      <Text variant="caption" className="px-2">
        {count} Pokémon
      </Text>
    </View>
  );
}

interface ChipProps {
  label: string;
  active: boolean;
  color: string;
  onPress: () => void;
  type?: string;
}

function Chip({ label, active, color, onPress, type }: ChipProps) {
  const foreground = active ? textColorOn(color) : color;
  return (
    <Pressable
      onPress={() => {
        haptics.select();
        onPress();
      }}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      className="flex-row items-center gap-1.5 rounded-full border px-3.5 py-2 active:opacity-80"
      style={{ backgroundColor: active ? color : `${color}1F`, borderColor: `${color}55` }}
    >
      {type && <TypeIcon type={type} size={13} color={foreground} />}
      <Text color={foreground} className="text-[13px] font-semibold">
        {label}
      </Text>
    </Pressable>
  );
}
