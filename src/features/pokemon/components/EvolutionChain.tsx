import { Fragment } from "react";
import { Pressable, View } from "react-native";
import { router } from "expo-router";
import { formatName, formatNumber } from "@/lib/format";
import { useThemeColors } from "@/theme/colors";
import { ErrorMessage, Loading } from "@/ui/Feedback";
import { Icon } from "@/ui/Icon";
import { Text } from "@/ui/Text";
import { useEvolutionChain } from "../api";
import { Artwork } from "./Artwork";

interface EvolutionChainProps {
  chainUrl: string | undefined;
  currentId: number;
}

export function EvolutionChain({ chainUrl, currentId }: EvolutionChainProps) {
  const chain = useEvolutionChain(chainUrl);
  const theme = useThemeColors();

  if (chain.isError) return <ErrorMessage onRetry={() => chain.refetch()} />;
  if (!chain.data) return <Loading />;
  if (chain.data.length === 1) return <Text variant="secondary">Este Pokémon não evolui.</Text>;

  return (
    <View className="items-center">
      {chain.data.map((stage, index) => (
        <Fragment key={stage.map((s) => s.id).join("-")}>
          {index > 0 && (
            <View className="my-1.5">
              <Icon name="arrowDown" size={18} color={theme.muted} />
            </View>
          )}
          <View className="flex-row flex-wrap justify-center gap-2.5">
            {stage.map((evolution) => {
              const isCurrent = evolution.id === currentId;
              return (
                <Pressable
                  key={evolution.id}
                  disabled={isCurrent}
                  onPress={() =>
                    router.push({ pathname: "/pokemon/[id]", params: { id: evolution.id } })
                  }
                  className={`w-[104px] items-center rounded-3xl border-2 bg-canvas px-1.5 py-2.5 active:opacity-80 dark:bg-canvas-dark ${
                    isCurrent ? "border-brand" : "border-line dark:border-line-dark"
                  }`}
                >
                  <Artwork id={evolution.id} size={72} />
                  <Text className="text-center text-[13px] font-semibold">
                    {formatName(evolution.name)}
                  </Text>
                  <Text variant="caption">{formatNumber(evolution.id)}</Text>
                </Pressable>
              );
            })}
          </View>
        </Fragment>
      ))}
    </View>
  );
}
