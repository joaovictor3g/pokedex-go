import React from "react";
import { StyleProp, TextStyle } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors, withAlpha } from "../theme";

interface PokeballWatermarkProps {
  size: number;
  style?: StyleProp<TextStyle>;
  opacity?: number;
}

// Large faded pokéball drawn behind card content.
export function PokeballWatermark({ size, style, opacity = 0.18 }: PokeballWatermarkProps) {
  return (
    <MaterialCommunityIcons
      name="pokeball"
      size={size}
      color={withAlpha(colors.white, opacity)}
      style={[{ position: "absolute" }, style]}
      pointerEvents="none"
    />
  );
}
