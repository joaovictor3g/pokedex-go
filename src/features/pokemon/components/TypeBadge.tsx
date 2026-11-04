import { View } from "react-native";
import { palette, textColorOn, withAlpha } from "@/theme/colors";
import { getTypeInfo } from "@/theme/pokemonTypes";
import { PlatformIcon } from "@/ui/Icon";
import { Text } from "@/ui/Text";

export function TypeIcon({
  type,
  size = 16,
  color,
}: {
  type: string;
  size?: number;
  color?: string;
}) {
  const info = getTypeInfo(type);
  return <PlatformIcon sf={info.sf} mci={info.mci} size={size} color={color ?? info.color} />;
}

interface TypeBadgeProps {
  type: string;
  // "onColor" sits on a type-colored card; "solid" on neutral surfaces.
  variant?: "solid" | "onColor";
  size?: "sm" | "md";
}

export function TypeBadge({ type, variant = "solid", size = "md" }: TypeBadgeProps) {
  const info = getTypeInfo(type);
  const background = variant === "solid" ? info.color : withAlpha(palette.white, 0.25);
  const foreground = variant === "solid" ? textColorOn(info.color) : palette.white;
  const small = size === "sm";

  return (
    <View
      className={`flex-row items-center self-start rounded-full ${small ? "gap-1 px-2 py-0.5" : "gap-1.5 px-3 py-1"}`}
      style={{ backgroundColor: background }}
    >
      <TypeIcon type={type} size={small ? 10 : 13} color={foreground} />
      <Text
        color={foreground}
        className={small ? "text-[11px] font-semibold" : "text-[13px] font-semibold"}
      >
        {info.label}
      </Text>
    </View>
  );
}
