import type { ComponentProps } from "react";
import { Platform } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { SymbolView, type SFSymbol } from "expo-symbols";

type MciName = ComponentProps<typeof MaterialCommunityIcons>["name"];

// SF Symbol on iOS, Material Community icon elsewhere.
const icons = {
  heart: { sf: "heart", mci: "heart-outline" },
  "heart.fill": { sf: "heart.fill", mci: "heart" },
  search: { sf: "magnifyingglass", mci: "magnify" },
  close: { sf: "xmark", mci: "close" },
  edit: { sf: "pencil", mci: "pencil" },
  trophy: { sf: "trophy.fill", mci: "trophy" },
  check: { sf: "checkmark.circle.fill", mci: "check-circle" },
  location: { sf: "mappin.and.ellipse", mci: "map-marker-outline" },
  trash: { sf: "trash", mci: "trash-can-outline" },
  arrowDown: { sf: "arrow.down", mci: "arrow-down" },
  chevronRight: { sf: "chevron.right", mci: "chevron-right" },
  offline: { sf: "wifi.slash", mci: "wifi-off" },
  pokeball: { sf: "circle.circle", mci: "pokeball" },
  sparkles: { sf: "sparkles", mci: "creation" },
  eye: { sf: "eye.fill", mci: "eye" },
  ruler: { sf: "ruler", mci: "ruler" },
  weight: { sf: "scalemass", mci: "weight-kilogram" },
  bolt: { sf: "bolt.fill", mci: "lightning-bolt" },
} satisfies Record<string, { sf: SFSymbol; mci: MciName }>;

export type IconName = keyof typeof icons;

interface IconProps {
  name: IconName;
  size?: number;
  color: string;
}

export function Icon({ name, size = 20, color }: IconProps) {
  return <PlatformIcon sf={icons[name].sf} mci={icons[name].mci} size={size} color={color} />;
}

interface PlatformIconProps {
  sf: SFSymbol;
  mci: MciName;
  size?: number;
  color: string;
}

export function PlatformIcon({ sf, mci, size = 20, color }: PlatformIconProps) {
  const fallback = <MaterialCommunityIcons name={mci} size={size} color={color} />;
  if (Platform.OS !== "ios") return fallback;
  return (
    <SymbolView
      name={sf}
      size={size}
      tintColor={color}
      weight="semibold"
      fallback={fallback}
      style={{ width: size, height: size }}
    />
  );
}
