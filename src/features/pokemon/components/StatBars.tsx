import { View } from "react-native";
import { ProgressBar } from "@/ui/ProgressBar";
import { Text } from "@/ui/Text";
import type { Pokemon } from "../logic";

const labels: Record<string, string> = {
  hp: "HP",
  attack: "Ataque",
  defense: "Defesa",
  "special-attack": "At. Esp.",
  "special-defense": "Def. Esp.",
  speed: "Velocidade",
};

const MAX_STAT = 255;
const MAX_TOTAL = 720;

export function StatBars({ pokemon, color }: { pokemon: Pokemon; color: string }) {
  const total = pokemon.stats.reduce((sum, s) => sum + s.base_stat, 0);
  const rows = [
    ...pokemon.stats.map((s) => ({
      key: s.stat.name,
      label: labels[s.stat.name] ?? s.stat.name,
      value: s.base_stat,
      max: MAX_STAT,
    })),
    { key: "total", label: "Total", value: total, max: MAX_TOTAL },
  ];

  return (
    <View className="gap-3.5">
      {rows.map((row) => (
        <View key={row.key} className="flex-row items-center">
          <Text variant="secondary" className="w-[92px] text-sm">
            {row.label}
          </Text>
          <Text className="w-10 text-sm font-semibold">{row.value}</Text>
          <ProgressBar value={row.value / row.max} color={color} />
        </View>
      ))}
    </View>
  );
}
