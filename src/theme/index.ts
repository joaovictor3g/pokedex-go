export const colors = {
  primary: "#EB5757",
  primaryDark: "#C94444",
  accent: "#48A9E0",
  background: "#F5F6FA",
  surface: "#FFFFFF",
  text: "#1B1D28",
  textMuted: "#7A7D8C",
  border: "#E6E8EF",
  success: "#3BB273",
  white: "#FFFFFF",
};

export const fonts = {
  regular: "Poppins_400Regular",
  medium: "Poppins_500Medium",
  semibold: "Poppins_600SemiBold",
  bold: "Poppins_700Bold",
};

export const radius = {
  sm: 8,
  md: 14,
  lg: 20,
  xl: 28,
  pill: 999,
};

export const shadow = {
  shadowColor: "#1B1D28",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.08,
  shadowRadius: 12,
  elevation: 3,
};

// Dark text on light backgrounds (electric, ice, steel...), white text on the rest.
export function textColorOn(hex: string) {
  const value = parseInt(hex.slice(1), 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.7 ? colors.text : colors.white;
}

// Appends an alpha channel to a #RRGGBB color.
export function withAlpha(hex: string, alpha: number) {
  return hex + Math.round(alpha * 255).toString(16).padStart(2, "0");
}
