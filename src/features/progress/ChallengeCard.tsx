import { Pressable, View } from "react-native";
import { TypeIcon } from "@/features/pokemon/components/TypeBadge";
import { haptics } from "@/lib/haptics";
import { palette } from "@/theme/colors";
import { getTypeInfo } from "@/theme/pokemonTypes";
import { Icon } from "@/ui/Icon";
import { ProgressBar } from "@/ui/ProgressBar";
import { Text } from "@/ui/Text";
import type { Challenge } from "./challenges";
import { useProgress } from "./ProgressProvider";

export function ChallengeCard({ challenge }: { challenge: Challenge }) {
  const { progressOf, isClaimed, canClaim, claim } = useProgress();
  const progress = progressOf(challenge);
  const color = challenge.type === "any" ? palette.accent : getTypeInfo(challenge.type).color;

  return (
    <View className="flex-row gap-3.5 rounded-3xl bg-card p-4 dark:bg-card-dark">
      <View
        className="h-12 w-12 items-center justify-center rounded-full"
        style={{ backgroundColor: `${color}26` }}
      >
        {challenge.type === "any" ? (
          <Icon name="pokeball" size={22} color={color} />
        ) : (
          <TypeIcon type={challenge.type} size={22} />
        )}
      </View>

      <View className="flex-1 gap-0.5">
        <View className="flex-row items-center justify-between gap-2">
          <Text variant="headline" className="flex-1 text-[15px]">
            {challenge.title}
          </Text>
          <Text color={palette.success} className="text-xs font-bold">
            +{challenge.xp} XP
          </Text>
        </View>
        <Text variant="secondary" className="text-[13px] leading-[18px]">
          {challenge.description}
        </Text>

        <View className="mt-2 flex-row items-center gap-2">
          <ProgressBar value={progress / challenge.goal} color={color} />
          <Text variant="caption">
            {progress}/{challenge.goal}
          </Text>
        </View>

        {isClaimed(challenge) ? (
          <View className="mt-2 flex-row items-center gap-1">
            <Icon name="check" size={15} color={palette.success} />
            <Text color={palette.success} className="text-[13px] font-semibold">
              Concluído
            </Text>
          </View>
        ) : (
          canClaim(challenge) && (
            <Pressable
              onPress={() => {
                haptics.success();
                claim(challenge);
              }}
              className="mt-2.5 self-start rounded-full bg-success px-4 py-2 active:opacity-80"
              accessibilityRole="button"
            >
              <Text color={palette.white} className="text-[13px] font-semibold">
                Resgatar XP
              </Text>
            </Pressable>
          )
        )}
      </View>
    </View>
  );
}
