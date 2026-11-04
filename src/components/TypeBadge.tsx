import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { colors, fonts, radius, textColorOn, withAlpha } from "../theme";
import { getTypeInfo } from "../theme/pokemonTypes";

type IconName = React.ComponentProps<typeof MaterialCommunityIcons>["name"];

interface TypeIconProps {
  type: string;
  size?: number;
  color?: string;
}

export function TypeIcon({ type, size = 18, color }: TypeIconProps) {
  const info = getTypeInfo(type);
  return <MaterialCommunityIcons name={info.icon as IconName} size={size} color={color ?? info.color} />;
}

interface TypeBadgeProps {
  type: string;
  // "onColor" sits on a type-colored card; "solid" is used on white surfaces.
  variant?: "solid" | "onColor";
  compact?: boolean;
}

export function TypeBadge({ type, variant = "solid", compact }: TypeBadgeProps) {
  const info = getTypeInfo(type);
  const background = variant === "solid" ? info.color : withAlpha(colors.white, 0.28);
  const foreground = variant === "solid" ? textColorOn(info.color) : colors.white;

  return (
    <Badge $background={background} $compact={compact}>
      <TypeIcon type={type} size={compact ? 12 : 16} color={foreground} />
      <Label $color={foreground} $compact={compact}>
        {info.label}
      </Label>
    </Badge>
  );
}

const Badge = styled.View<{ $background: string; $compact?: boolean }>`
  flex-direction: row;
  align-items: center;
  align-self: flex-start;
  gap: 4px;
  padding: ${(p) => (p.$compact ? "2px 8px" : "5px 12px")};
  border-radius: ${radius.pill}px;
  background-color: ${(p) => p.$background};
`;

const Label = styled.Text<{ $color: string; $compact?: boolean }>`
  font-family: ${fonts.medium};
  font-size: ${(p) => (p.$compact ? 11 : 13)}px;
  color: ${(p) => p.$color};
`;
