import React, { useEffect, useState } from "react";
import { Footer } from "../../components/Footer";
import {
  BackAndEditButtons,
  ChallengesContainer,
  Container,
  EditButton,
  Header,
  ImageContainer,
  Main,
  ProfileImage,
  Text,
} from "./styles";
import {
  MaterialIcons,
  Foundation,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import challengesJSON from "../../../challenges.json";
import { ScrollView, View } from "react-native";
import { ChallengeBox } from "../../components/ChallengeBox";
import { UserLevel } from "../../components/UserLevel";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Profile() {
  const challenges = challengesJSON;
  const [gymnasium, setGymnasium] = useState("");
  const [coachName, setCoachName] = useState("");
  useEffect(() => {
    AsyncStorage.getItem("coachName").then(
      (e) => e && setCoachName(JSON.parse(e))
    );
    AsyncStorage.getItem("gymnasium").then(
      (e) => e && setGymnasium(JSON.parse(e))
    );
  }, []);
  return (
    <>
      <Container>
        <Header>
          <BackAndEditButtons>
            <Text color="#fff" size={30} fontWeight>
              Perfil
            </Text>
            <EditButton>
              <MaterialIcons name="mode-edit" size={30} color="#fff" />
            </EditButton>
          </BackAndEditButtons>

          <ImageContainer>
            <ProfileImage
              source={{
                uri: "https://avatars.githubusercontent.com/u/55103977?v=4",
              }}
              resizeMode="contain"
            />
          </ImageContainer>
        </Header>

        <Main>
          <Text color="#000" size={30} fontWeight>
            {coachName}
          </Text>

          <Text color="#666" size={15} style={{ alignItems: "center" }}>
            <Foundation name="marker" size={20} color="black" />
            {" " + gymnasium}
          </Text>
          <UserLevel />

          <ChallengesContainer>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ width: "100%" }}
            >
              {challenges.map((challenge) => (
                <View
                  key={challenge.id}
                  style={{
                    marginTop: 10,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ChallengeBox
                    amountXp={challenge.amount_xp}
                    challengeType={challenge.challenge_type}
                    description={challenge.description}
                    id={challenge.id}
                    title={challenge.title}
                  />
                </View>
              ))}
            </ScrollView>
          </ChallengesContainer>
        </Main>
      </Container>
      <Footer currentPage="profile" />
    </>
  );
}
