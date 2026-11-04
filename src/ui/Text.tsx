import { Text as RNText, type TextProps as RNTextProps } from "react-native";

const variants = {
  largeTitle: "text-[32px] font-bold tracking-tight",
  title: "text-2xl font-bold tracking-tight",
  headline: "text-[17px] font-semibold",
  // No fixed line height: screens pass bigger sizes (text-[34px]...) and a 22px line would clip them.
  body: "text-[15px]",
  // Paragraph text; only used at 15px or smaller.
  secondary: "text-[15px] leading-[22px]",
  caption: "text-xs font-medium",
} as const;

const muted = new Set<keyof typeof variants>(["secondary", "caption"]);

export interface TextProps extends RNTextProps {
  variant?: keyof typeof variants;
  // Fixed color (e.g. on a type-colored card). Replaces the light/dark theme colors.
  color?: string;
  className?: string;
}

export function Text({ variant = "body", color, className = "", style, ...props }: TextProps) {
  const themeColor = muted.has(variant)
    ? "text-muted dark:text-muted-dark"
    : "text-ink dark:text-ink-dark";

  return (
    <RNText
      className={`${variants[variant]} ${color ? "" : themeColor} ${className}`}
      style={[color ? { color } : null, style]}
      {...props}
    />
  );
}
