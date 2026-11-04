import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TrainerForm } from "@/features/trainer/TrainerForm";
import { palette, withAlpha } from "@/theme/colors";
import { Glass } from "@/ui/Glass";
import { Gradient } from "@/ui/Gradient";
import { Icon } from "@/ui/Icon";
import { PokeballWatermark } from "@/ui/PokeballWatermark";
import { Text } from "@/ui/Text";

// First run. Saving a trainer flips the root Stack.Protected guard and lands on the tabs.
export default function OnboardingScreen() {
  const insets = useSafeAreaInsets();

  return (
    <Gradient
      colors={[palette.brand, palette.brandDark, "#5B1F8F"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1"
    >
      <PokeballWatermark size={340} opacity={0.12} style={{ right: -110, top: insets.top - 20 }} />
      <PokeballWatermark size={220} opacity={0.08} style={{ left: -90, bottom: 120 }} />

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerClassName="grow justify-end gap-8 px-5"
          contentContainerStyle={{ paddingTop: insets.top + 24, paddingBottom: insets.bottom + 24 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="gap-2 px-1">
            <Icon name="pokeball" size={44} color={palette.white} />
            <Text color={palette.white} className="text-[40px] font-black tracking-tight">
              Pokédex Go
            </Text>
            <Text color={withAlpha(palette.white, 0.85)} className="text-base leading-6">
              Explore mais de mil Pokémon, guarde seus favoritos e complete desafios para subir de
              nível.
            </Text>
          </View>

          <Glass className="gap-1 rounded-[32px] p-5">
            <Text variant="headline" className="mb-2 text-xl">
              Quem é você, treinador?
            </Text>
            <TrainerForm submitLabel="Começar" />
          </Glass>
        </ScrollView>
      </KeyboardAvoidingView>
    </Gradient>
  );
}
