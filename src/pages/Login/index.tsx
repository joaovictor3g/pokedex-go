import React, { useEffect, useState } from "react";
import {
  Container,
  Input,
  Label,
  LoginBox,
  LoginButton,
  PokeballImage,
  TextButton,
} from "./styles";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Login() {
  const [gymnasium, setGymnasium] = useState("");
  const [coachName, setCoachName] = useState("");

  const { navigate } = useNavigation();

  useEffect(() => {
    AsyncStorage.getItem("coachName").then(
      (e) => e && setCoachName(JSON.parse(e))
    );
    AsyncStorage.getItem("gymnasium").then(
      (e) => e && setGymnasium(JSON.parse(e))
    );
  }, []);

  function handleNavigateToListPokemons() {
    AsyncStorage.setItem("coachName", JSON.stringify(coachName));
    AsyncStorage.setItem("gymnasium", JSON.stringify(gymnasium));
    navigate("/home");
  }

  return (
    <Container>
      <LoginBox>
        <Label>Nome do treinador</Label>
        <Input
          value={coachName}
          onChangeText={(value) => setCoachName(value)}
        />

        <Label style={{ marginTop: 20 }}>Ginásio atual</Label>
        <Input
          value={gymnasium}
          onChangeText={(value) => setGymnasium(value)}
        />

        <LoginButton onPress={handleNavigateToListPokemons}>
          <TextButton>Entrar</TextButton>
        </LoginButton>
      </LoginBox>
    </Container>
  );
}
