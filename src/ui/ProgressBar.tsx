import { View } from "react-native";
import { palette } from "@/theme/colors";

interface ProgressBarProps {
  value: number; // 0..1
  color?: string;
  // Overrides the themed track color (e.g. translucent white on a gradient).
  trackColor?: string;
  thick?: boolean;
}

export function ProgressBar({
  value,
  color = palette.accent,
  trackColor,
  thick,
}: ProgressBarProps) {
  const percent = Math.max(0, Math.min(1, value)) * 100;
  return (
    <View
      className={`flex-1 overflow-hidden rounded-full ${thick ? "h-2.5" : "h-2"} ${trackColor ? "" : "bg-line dark:bg-line-dark"}`}
      style={trackColor ? { backgroundColor: trackColor } : undefined}
    >
      <View
        className="h-full rounded-full"
        style={{ width: `${percent}%`, backgroundColor: color }}
      />
    </View>
  );
}
