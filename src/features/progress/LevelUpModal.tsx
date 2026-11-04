import { Modal, Pressable, View } from "react-native";
import { BlurView } from "expo-blur";
import { palette } from "@/theme/colors";
import { Glass } from "@/ui/Glass";
import { Icon } from "@/ui/Icon";
import { Text } from "@/ui/Text";
import { useProgress } from "./ProgressProvider";

export function LevelUpModal() {
  const { levelUpTo, dismissLevelUp } = useProgress();

  return (
    <Modal
      visible={levelUpTo !== null}
      transparent
      animationType="fade"
      onRequestClose={dismissLevelUp}
    >
      <BlurView intensity={30} tint="dark" style={{ flex: 1 }}>
        <View className="flex-1 items-center justify-center bg-black/30 px-8">
          <Glass className="w-full items-center gap-1 rounded-[32px] px-6 py-7">
            <Icon name="trophy" size={56} color={palette.gold} />
            <Text variant="title" className="mt-2">
              Subiu de nível!
            </Text>
            <Text color={palette.brand} className="text-[64px] font-black leading-[72px]">
              {levelUpTo}
            </Text>
            <Text variant="secondary" className="text-center">
              Continue explorando a Pokédex para completar mais desafios.
            </Text>
            <Pressable
              onPress={dismissLevelUp}
              className="mt-5 self-stretch items-center rounded-full bg-brand py-3.5 active:opacity-80"
              accessibilityRole="button"
            >
              <Text color={palette.white} className="text-base font-semibold">
                Continuar
              </Text>
            </Pressable>
          </Glass>
        </View>
      </BlurView>
    </Modal>
  );
}
