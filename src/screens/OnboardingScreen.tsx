import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { PokeballWatermark } from "../components/PokeballWatermark";
import { useTrainer } from "../state/TrainerContext";
import { colors, fonts, radius, shadow } from "../theme";

// First-run form; also opened from the profile as "EditTrainer".
export function OnboardingScreen() {
  const { trainer, saveTrainer } = useTrainer();
  const navigation = useNavigation();
  const isEditing = useRoute().name === "EditTrainer";

  const [name, setName] = useState(trainer?.name ?? "");
  const [gym, setGym] = useState(trainer?.gym ?? "");
  const canSubmit = name.trim().length > 0;

  function handleSubmit() {
    if (!canSubmit) return;
    // Saving the first trainer swaps the navigator over to the tabs on its own.
    saveTrainer({ name: name.trim(), gym: gym.trim() });
    if (isEditing) navigation.goBack();
  }

  return (
    <Container>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <Hero edges={["top"]}>
            <PokeballWatermark size={260} style={{ right: -70, top: -30 }} />
            {isEditing && (
              <CloseButton onPress={() => navigation.goBack()} hitSlop={12}>
                <MaterialCommunityIcons name="close" size={26} color={colors.white} />
              </CloseButton>
            )}
            <MaterialCommunityIcons name="pokeball" size={56} color={colors.white} />
            <HeroTitle>{isEditing ? "Editar treinador" : "Pokédex Go"}</HeroTitle>
            <HeroSubtitle>
              {isEditing
                ? "Atualize seus dados de treinador."
                : "Explore, favorite e complete desafios para subir de nível."}
            </HeroSubtitle>
          </Hero>

          <Card style={shadow}>
            <Label>Nome do treinador</Label>
            <Input
              value={name}
              onChangeText={setName}
              placeholder="Ash Ketchum"
              placeholderTextColor={colors.textMuted}
              autoCapitalize="words"
              returnKeyType="next"
            />

            <Label>Ginásio atual</Label>
            <Input
              value={gym}
              onChangeText={setGym}
              placeholder="Ginásio de Pewter"
              placeholderTextColor={colors.textMuted}
              autoCapitalize="words"
              returnKeyType="done"
              onSubmitEditing={handleSubmit}
            />

            <SubmitButton onPress={handleSubmit} disabled={!canSubmit} $disabled={!canSubmit}>
              <SubmitText>{isEditing ? "Salvar" : "Começar"}</SubmitText>
            </SubmitButton>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${colors.background};
`;

const Hero = styled(SafeAreaView)`
  padding: 32px 24px 72px;
  background-color: ${colors.primary};
  border-bottom-left-radius: ${radius.xl}px;
  border-bottom-right-radius: ${radius.xl}px;
  overflow: hidden;
`;

const CloseButton = styled.TouchableOpacity`
  align-self: flex-end;
`;

const HeroTitle = styled.Text`
  font-family: ${fonts.bold};
  font-size: 32px;
  color: ${colors.white};
  margin-top: 16px;
`;

const HeroSubtitle = styled.Text`
  font-family: ${fonts.regular};
  font-size: 15px;
  color: ${colors.white};
  opacity: 0.9;
  margin-top: 4px;
`;

const Card = styled.View`
  margin: -48px 20px 32px;
  padding: 24px;
  border-radius: ${radius.lg}px;
  background-color: ${colors.surface};
`;

const Label = styled.Text`
  font-family: ${fonts.medium};
  font-size: 13px;
  color: ${colors.textMuted};
  margin-bottom: 6px;
`;

const Input = styled.TextInput`
  font-family: ${fonts.regular};
  font-size: 16px;
  color: ${colors.text};
  padding: 12px 14px;
  margin-bottom: 18px;
  border-radius: ${radius.md}px;
  border: 1px solid ${colors.border};
  background-color: ${colors.background};
`;

const SubmitButton = styled.TouchableOpacity<{ $disabled: boolean }>`
  align-items: center;
  padding: 15px;
  margin-top: 6px;
  border-radius: ${radius.md}px;
  background-color: ${colors.primary};
  opacity: ${(p) => (p.$disabled ? 0.5 : 1)};
`;

const SubmitText = styled.Text`
  font-family: ${fonts.semibold};
  font-size: 16px;
  color: ${colors.white};
`;
