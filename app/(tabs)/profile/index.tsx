import { Pressable, ScrollView, View } from "react-native";
import { Link, Stack } from "expo-router";
import { useFavorites } from "@/features/favorites/FavoritesProvider";
import { ChallengeCard } from "@/features/progress/ChallengeCard";
import { challenges } from "@/features/progress/challenges";
import { useProgress } from "@/features/progress/ProgressProvider";
import { useTrainer } from "@/features/trainer/TrainerProvider";
import { palette, withAlpha } from "@/theme/colors";
import { Glass } from "@/ui/Glass";
import { Gradient } from "@/ui/Gradient";
import { Icon } from "@/ui/Icon";
import { PokeballWatermark } from "@/ui/PokeballWatermark";
import { ProgressBar } from "@/ui/ProgressBar";
import { Text } from "@/ui/Text";

export default function ProfileScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Perfil",
          headerRight: () => (
            <Link href="/trainer" asChild>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Editar treinador"
                hitSlop={10}
              >
                <Icon name="edit" size={18} color={palette.brand} />
              </Pressable>
            </Link>
          ),
        }}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerClassName="gap-3 px-5 pb-10 pt-2"
        showsVerticalScrollIndicator={false}
      >
        <TrainerCard />
        <Text variant="title" className="mt-4">
          Desafios
        </Text>
        {challenges.map((challenge) => (
          <ChallengeCard key={challenge.id} challenge={challenge} />
        ))}
      </ScrollView>
    </>
  );
}

function TrainerCard() {
  const { trainer } = useTrainer();
  const { favorites } = useFavorites();
  const { level, xpIntoLevel, xpToNext, seenCount } = useProgress();
  const white = palette.white;
  const soft = withAlpha(white, 0.85);

  return (
    <Gradient
      colors={[palette.brand, palette.brandDark, "#8E2DE2"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="overflow-hidden rounded-[32px] p-5"
    >
      <PokeballWatermark size={260} style={{ right: -70, top: -60 }} />

      <View className="flex-row items-center gap-4">
        <View className="h-[72px] w-[72px] items-center justify-center rounded-full border-4 border-white/40 bg-white">
          <Text color={palette.brand} className="text-[30px] font-black">
            {trainer?.name.charAt(0).toUpperCase()}
          </Text>
        </View>
        <View className="flex-1">
          <Text color={white} className="text-2xl font-bold" numberOfLines={1}>
            {trainer?.name}
          </Text>
          {!!trainer?.gym && (
            <View className="flex-row items-center gap-1">
              <Icon name="location" size={13} color={soft} />
              <Text color={soft} className="text-sm" numberOfLines={1}>
                {trainer.gym}
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Level panel on Liquid Glass over the gradient. */}
      <Glass variant="clear" className="mt-5 gap-3 rounded-3xl p-4">
        <View className="flex-row items-baseline justify-between">
          <Text color={white} className="text-xl font-bold">
            Nível {level}
          </Text>
          <Text color={soft} className="text-[13px] font-medium">
            {xpIntoLevel} / {xpToNext} XP
          </Text>
        </View>
        <View className="flex-row">
          <ProgressBar
            value={xpIntoLevel / xpToNext}
            color={white}
            trackColor={withAlpha(white, 0.25)}
            thick
          />
        </View>
        <View className="flex-row">
          <Stat label="Pokémon vistos" value={seenCount} />
          <Stat label="Favoritos" value={favorites.length} />
        </View>
      </Glass>
    </Gradient>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <View className="flex-1 items-center">
      <Text color={palette.white} className="text-xl font-bold">
        {value}
      </Text>
      <Text color={withAlpha(palette.white, 0.8)} className="text-xs">
        {label}
      </Text>
    </View>
  );
}
