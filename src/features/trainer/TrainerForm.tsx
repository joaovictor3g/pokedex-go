import { useRef, useState, type ComponentRef } from "react";
import { Pressable, TextInput, View } from "react-native";
import { haptics } from "@/lib/haptics";
import { palette, useThemeColors } from "@/theme/colors";
import { Text } from "@/ui/Text";
import { useTrainer, type Trainer } from "./TrainerProvider";

interface TrainerFormProps {
  submitLabel: string;
  onSaved?: (trainer: Trainer) => void;
}

export function TrainerForm({ submitLabel, onSaved }: TrainerFormProps) {
  const { trainer, saveTrainer } = useTrainer();
  const theme = useThemeColors();
  const gymRef = useRef<ComponentRef<typeof TextInput>>(null);
  const [name, setName] = useState(trainer?.name ?? "");
  const [gym, setGym] = useState(trainer?.gym ?? "");
  const canSubmit = name.trim().length > 0;

  function submit() {
    if (!canSubmit) return;
    const next = { name: name.trim(), gym: gym.trim() };
    haptics.success();
    saveTrainer(next);
    onSaved?.(next);
  }

  const inputClass =
    "rounded-2xl border border-line bg-canvas/70 px-4 py-3.5 text-base text-ink dark:border-line-dark dark:bg-canvas-dark/70 dark:text-ink-dark";

  return (
    <View className="gap-1.5">
      <Text variant="caption" className="ml-1">
        Nome do treinador
      </Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Ash Ketchum"
        placeholderTextColor={theme.muted}
        autoCapitalize="words"
        autoComplete="name"
        returnKeyType="next"
        onSubmitEditing={() => gymRef.current?.focus()}
        submitBehavior="submit"
        className={inputClass}
      />

      <Text variant="caption" className="ml-1 mt-3">
        Ginásio atual
      </Text>
      <TextInput
        ref={gymRef}
        value={gym}
        onChangeText={setGym}
        placeholder="Ginásio de Pewter"
        placeholderTextColor={theme.muted}
        autoCapitalize="words"
        returnKeyType="done"
        onSubmitEditing={submit}
        className={inputClass}
      />

      <Pressable
        onPress={submit}
        disabled={!canSubmit}
        accessibilityRole="button"
        className="mt-5 items-center rounded-full bg-brand py-4 active:opacity-80 disabled:opacity-40"
      >
        <Text color={palette.white} className="text-[17px] font-semibold">
          {submitLabel}
        </Text>
      </Pressable>
    </View>
  );
}
