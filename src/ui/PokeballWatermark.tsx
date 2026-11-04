import { type StyleProp, type TextStyle } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { palette, withAlpha } from "@/theme/colors";

interface PokeballWatermarkProps {
  size: number;
  style?: StyleProp<TextStyle>;
  opacity?: number;
}

// Large faded pokéball drawn behind card content.
export function PokeballWatermark({ size, style, opacity = 0.16 }: PokeballWatermarkProps) {
  return (
    <MaterialCommunityIcons
      name="pokeball"
      size={size}
      color={withAlpha(palette.white, opacity)}
      style={[{ position: "absolute" }, style]}
      pointerEvents="none"
    />
  );
}
