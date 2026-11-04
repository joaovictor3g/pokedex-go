import { Pressable, View } from "react-native";
import LottieView from "lottie-react-native";
import pikachuAnimation from "@/assets/22892-pikachu.json";
import { useThemeColors } from "@/theme/colors";
import { Icon, type IconName } from "./Icon";
import { Text } from "./Text";

export function Loading() {
  return (
    <View className="flex-1 items-center justify-center py-10">
      <LottieView source={pikachuAnimation} autoPlay loop style={{ width: 160, height: 160 }} />
    </View>
  );
}

interface MessageProps {
  icon: IconName;
  title: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function Message({ icon, title, message, actionLabel, onAction }: MessageProps) {
  const theme = useThemeColors();
  return (
    <View className="flex-1 items-center justify-center gap-1 px-8 py-16">
      <Icon name={icon} size={44} color={theme.muted} />
      <Text variant="headline" className="mt-3 text-center">
        {title}
      </Text>
      {message && (
        <Text variant="secondary" className="text-center">
          {message}
        </Text>
      )}
      {actionLabel && onAction && (
        <Pressable
          onPress={onAction}
          className="mt-4 rounded-full bg-brand px-5 py-2.5 active:opacity-80"
          accessibilityRole="button"
        >
          <Text color="#FFFFFF" className="font-semibold">
            {actionLabel}
          </Text>
        </Pressable>
      )}
    </View>
  );
}

export function ErrorMessage({ onRetry }: { onRetry: () => void }) {
  return (
    <Message
      icon="offline"
      title="Não foi possível carregar"
      message="Verifique sua conexão e tente de novo."
      actionLabel="Tentar de novo"
      onAction={onRetry}
    />
  );
}
