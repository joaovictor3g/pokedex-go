import type { ReactNode } from "react";
import { Platform, Pressable, View, type StyleProp, type ViewStyle } from "react-native";
import { BlurView } from "expo-blur";
import { GlassView, isGlassEffectAPIAvailable, isLiquidGlassAvailable } from "expo-glass-effect";
import { styled } from "react-native-css";

const StyledGlassView = styled(GlassView);
const StyledBlurView = styled(BlurView);

// iOS 26+ renders real Liquid Glass; older iOS gets a blur, Android a translucent fill.
export const hasLiquidGlass =
  Platform.OS === "ios" && isLiquidGlassAvailable() && isGlassEffectAPIAvailable();

interface GlassProps {
  children?: ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
  tintColor?: string;
  interactive?: boolean;
  variant?: "regular" | "clear";
}

export function Glass({
  children,
  className = "",
  style,
  tintColor,
  interactive,
  variant = "regular",
}: GlassProps) {
  if (hasLiquidGlass) {
    return (
      <StyledGlassView
        glassEffectStyle={variant}
        tintColor={tintColor}
        isInteractive={interactive}
        className={className}
        style={style}
      >
        {children}
      </StyledGlassView>
    );
  }

  if (Platform.OS === "ios") {
    return (
      <StyledBlurView
        tint="systemChromeMaterial"
        intensity={variant === "clear" ? 40 : 80}
        className={`overflow-hidden ${className}`}
        style={[tintColor ? { backgroundColor: tintColor } : null, style]}
      >
        {children}
      </StyledBlurView>
    );
  }

  return (
    <View
      className={`overflow-hidden bg-white/75 dark:bg-card-dark/80 ${className}`}
      style={[tintColor ? { backgroundColor: tintColor } : null, style]}
    >
      {children}
    </View>
  );
}

interface GlassButtonProps {
  children: ReactNode;
  onPress: () => void;
  accessibilityLabel: string;
  className?: string;
  tintColor?: string;
  disabled?: boolean;
}

// Round or pill-shaped interactive glass control.
export function GlassButton({
  children,
  onPress,
  accessibilityLabel,
  className = "",
  tintColor,
  disabled,
}: GlassButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      hitSlop={8}
      className="active:opacity-80 disabled:opacity-40"
    >
      <Glass
        interactive
        tintColor={tintColor}
        className={`items-center justify-center rounded-full ${className}`}
      >
        {children}
      </Glass>
    </Pressable>
  );
}
