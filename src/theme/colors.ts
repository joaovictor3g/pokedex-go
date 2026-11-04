import { useColorScheme } from "react-native";

// Mirrors the @theme tokens in global.css, for native props that can't take a className
// (tintColor, header colors, SF Symbol colors...).
export const palette = {
  brand: "#EB5757",
  brandDark: "#C94444",
  accent: "#48A9E0",
  success: "#34C759",
  gold: "#F4B400",
  white: "#FFFFFF",
};

const light = {
  canvas: "#F2F3F8",
  card: "#FFFFFF",
  ink: "#16171F",
  muted: "#767987",
  line: "#E3E5EC",
};

const dark: typeof light = {
  canvas: "#0E0F14",
  card: "#1B1C23",
  ink: "#F4F5FA",
  muted: "#9A9DAB",
  line: "#2A2B34",
};

export function useThemeColors() {
  return useColorScheme() === "dark" ? dark : light;
}

// Dark text on light backgrounds (electric, ice, steel...), white text on the rest.
export function textColorOn(hex: string) {
  const value = parseInt(hex.slice(1), 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.7 ? light.ink : palette.white;
}

// Mixes a #RRGGBB color toward black (amount > 0) or white (amount < 0).
export function shade(hex: string, amount: number) {
  const value = parseInt(hex.slice(1), 16);
  const target = amount > 0 ? 0 : 255;
  const mix = (channel: number) => Math.round(channel + (target - channel) * Math.abs(amount));
  const r = mix((value >> 16) & 255);
  const g = mix((value >> 8) & 255);
  const b = mix(value & 255);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

// Appends an alpha channel to a #RRGGBB color.
export function withAlpha(hex: string, alpha: number) {
  return (
    hex +
    Math.round(alpha * 255)
      .toString(16)
      .padStart(2, "0")
  );
}
