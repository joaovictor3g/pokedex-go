import React from "react";
import { Modal } from "react-native";
import { Container, LevelUpText } from "./styles";

export function LevelUpModal() {
  return (
    <Container>
      <Modal
        animationType="slide"
        transparent={true}
        visible
        onRequestClose={() => {}}
      >
        <Container>
          <LevelUpText>Modal</LevelUpText>
        </Container>
      </Modal>
    </Container>
  );
}
