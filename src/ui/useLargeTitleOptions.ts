import { Platform } from "react-native";
import { palette, useThemeColors } from "@/theme/colors";

// Native large-title header shared by the tab stacks. On iOS 26 the transparent bar gets the
// system Liquid Glass scroll-edge effect; scroll views need contentInsetAdjustmentBehavior="automatic".
export function useLargeTitleOptions() {
  const colors = useThemeColors();
  const ios = Platform.OS === "ios";

  return {
    headerLargeTitle: true,
    headerTransparent: ios,
    headerShadowVisible: false,
    headerLargeTitleShadowVisible: false,
    headerTintColor: palette.brand,
    headerTitleStyle: { color: colors.ink },
    headerLargeTitleStyle: { color: colors.ink },
    headerStyle: ios ? undefined : { backgroundColor: colors.canvas },
    contentStyle: { backgroundColor: colors.canvas },
  } as const;
}
