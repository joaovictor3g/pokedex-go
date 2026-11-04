import React from "react";
import { Modal } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { useProgress } from "../state/ProgressContext";
import { colors, fonts, radius } from "../theme";

export function LevelUpModal() {
  const { levelUpTo, dismissLevelUp } = useProgress();

  return (
    <Modal visible={levelUpTo !== null} transparent animationType="fade" onRequestClose={dismissLevelUp}>
      <Backdrop>
        <Sheet>
          <MaterialCommunityIcons name="trophy" size={64} color="#F4B400" />
          <Title>Subiu de nível!</Title>
          <Level>{levelUpTo}</Level>
          <Body>Continue explorando a Pokédex para completar mais desafios.</Body>
          <Button onPress={dismissLevelUp}>
            <ButtonText>Continuar</ButtonText>
          </Button>
        </Sheet>
      </Backdrop>
    </Modal>
  );
}

const Backdrop = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 32px;
  background-color: rgba(27, 29, 40, 0.55);
`;

const Sheet = styled.View`
  width: 100%;
  align-items: center;
  padding: 28px 24px;
  border-radius: ${radius.xl}px;
  background-color: ${colors.surface};
`;

const Title = styled.Text`
  font-family: ${fonts.bold};
  font-size: 22px;
  color: ${colors.text};
  margin-top: 8px;
`;

const Level = styled.Text`
  font-family: ${fonts.bold};
  font-size: 56px;
  line-height: 64px;
  color: ${colors.primary};
`;

const Body = styled.Text`
  font-family: ${fonts.regular};
  font-size: 14px;
  color: ${colors.textMuted};
  text-align: center;
`;

const Button = styled.TouchableOpacity`
  margin-top: 20px;
  align-self: stretch;
  align-items: center;
  padding: 14px;
  border-radius: ${radius.md}px;
  background-color: ${colors.primary};
`;

const ButtonText = styled.Text`
  font-family: ${fonts.semibold};
  font-size: 16px;
  color: ${colors.white};
`;
