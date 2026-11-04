import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import styled from "styled-components/native";
import pikachuAnimation from "../assets/22892-pikachu.json";
import { colors, fonts, radius } from "../theme";

type IconName = React.ComponentProps<typeof MaterialCommunityIcons>["name"];

export function Loading() {
  return (
    <Center>
      <LottieView source={pikachuAnimation} autoPlay loop style={{ width: 180, height: 180 }} />
    </Center>
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
  return (
    <Center>
      <MaterialCommunityIcons name={icon} size={56} color={colors.textMuted} />
      <Title>{title}</Title>
      {message && <Body>{message}</Body>}
      {actionLabel && onAction && (
        <Action onPress={onAction}>
          <ActionText>{actionLabel}</ActionText>
        </Action>
      )}
    </Center>
  );
}

export function ErrorMessage({ onRetry }: { onRetry: () => void }) {
  return (
    <Message
      icon="wifi-off"
      title="Não foi possível carregar"
      message="Verifique sua conexão e tente de novo."
      actionLabel="Tentar de novo"
      onAction={onRetry}
    />
  );
}

const Center = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 32px;
`;

const Title = styled.Text`
  font-family: ${fonts.semibold};
  font-size: 18px;
  color: ${colors.text};
  margin-top: 12px;
  text-align: center;
`;

const Body = styled.Text`
  font-family: ${fonts.regular};
  font-size: 14px;
  color: ${colors.textMuted};
  margin-top: 4px;
  text-align: center;
`;

const Action = styled.TouchableOpacity`
  margin-top: 16px;
  padding: 10px 20px;
  border-radius: ${radius.pill}px;
  background-color: ${colors.primary};
`;

const ActionText = styled.Text`
  font-family: ${fonts.semibold};
  color: ${colors.white};
`;
