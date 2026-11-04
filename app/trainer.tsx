import { View } from "react-native";
import { router } from "expo-router";
import { TrainerForm } from "@/features/trainer/TrainerForm";
import { hasLiquidGlass } from "@/ui/Glass";
import { Text } from "@/ui/Text";

// Edit sheet. On iOS 26 the form sheet itself is Liquid Glass (see the root layout).
export default function EditTrainerSheet() {
  return (
    <View className={`flex-1 gap-4 px-6 pt-8 ${hasLiquidGlass ? "" : "bg-card dark:bg-card-dark"}`}>
      <Text variant="title">Editar treinador</Text>
      <TrainerForm submitLabel="Salvar" onSaved={() => router.back()} />
    </View>
  );
}
