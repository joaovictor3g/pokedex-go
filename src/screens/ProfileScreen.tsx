import React from "react";
import { ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { PokeballWatermark } from "../components/PokeballWatermark";
import { ProgressBar } from "../components/ProgressBar";
import { TypeIcon } from "../components/TypeBadge";
import { Challenge, challenges } from "../data/challenges";
import { TabScreenProps } from "../navigation/types";
import { useFavorites } from "../state/FavoritesContext";
import { useProgress } from "../state/ProgressContext";
import { useTrainer } from "../state/TrainerContext";
import { colors, fonts, radius, shadow } from "../theme";
import { getTypeInfo } from "../theme/pokemonTypes";

export function ProfileScreen({ navigation }: TabScreenProps<"Profile">) {
  const { trainer } = useTrainer();
  const { favorites } = useFavorites();
  const { level, xpIntoLevel, xpToNext, seenCount } = useProgress();
  const initial = trainer?.name.charAt(0).toUpperCase() ?? "?";

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
      <Hero edges={["top"]}>
        <PokeballWatermark size={240} style={{ right: -60, top: -20 }} />
        <EditButton onPress={() => navigation.navigate("EditTrainer")} hitSlop={12}>
          <MaterialCommunityIcons name="pencil" size={22} color={colors.white} />
        </EditButton>
        <Avatar>
          <AvatarText>{initial}</AvatarText>
        </Avatar>
        <TrainerName>{trainer?.name}</TrainerName>
        {!!trainer?.gym && (
          <GymRow>
            <MaterialCommunityIcons name="map-marker-outline" size={16} color={colors.white} />
            <GymText>{trainer.gym}</GymText>
          </GymRow>
        )}
      </Hero>

      <LevelCard style={shadow}>
        <LevelHeader>
          <LevelLabel>Nível {level}</LevelLabel>
          <LevelXp>
            {xpIntoLevel} / {xpToNext} XP
          </LevelXp>
        </LevelHeader>
        <ProgressBar value={xpIntoLevel / xpToNext} color={colors.primary} height={10} />
        <Summary>
          <SummaryItem>
            <SummaryValue>{seenCount}</SummaryValue>
            <SummaryLabel>Pokémon vistos</SummaryLabel>
          </SummaryItem>
          <SummaryItem>
            <SummaryValue>{favorites.length}</SummaryValue>
            <SummaryLabel>Favoritos</SummaryLabel>
          </SummaryItem>
        </Summary>
      </LevelCard>

      <SectionTitle>Desafios</SectionTitle>
      {challenges.map((challenge) => (
        <ChallengeCard key={challenge.id} challenge={challenge} />
      ))}
    </ScrollView>
  );
}

function ChallengeCard({ challenge }: { challenge: Challenge }) {
  const { progressOf, isClaimed, claim } = useProgress();
  const progress = progressOf(challenge);
  const claimed = isClaimed(challenge);
  const complete = progress >= challenge.goal;
  const color = challenge.type === "any" ? colors.accent : getTypeInfo(challenge.type).color;

  return (
    <Card style={shadow}>
      <IconCircle $color={color}>
        {challenge.type === "any" ? (
          <MaterialCommunityIcons name="pokeball" size={26} color={color} />
        ) : (
          <TypeIcon type={challenge.type} size={26} />
        )}
      </IconCircle>
      <CardBody>
        <CardHeader>
          <CardTitle>{challenge.title}</CardTitle>
          <XpBadge>+{challenge.xp} XP</XpBadge>
        </CardHeader>
        <CardDescription>{challenge.description}</CardDescription>
        <ProgressRow>
          <ProgressBar value={progress / challenge.goal} color={color} />
          <ProgressText>
            {progress}/{challenge.goal}
          </ProgressText>
        </ProgressRow>
        {claimed ? (
          <Done>
            <MaterialCommunityIcons name="check-circle" size={16} color={colors.success} />
            <DoneText>Concluído</DoneText>
          </Done>
        ) : (
          complete && (
            <ClaimButton onPress={() => claim(challenge)}>
              <ClaimText>Resgatar XP</ClaimText>
            </ClaimButton>
          )
        )}
      </CardBody>
    </Card>
  );
}

const Hero = styled(SafeAreaView)`
  align-items: center;
  padding: 16px 24px 64px;
  background-color: ${colors.primary};
  border-bottom-left-radius: ${radius.xl}px;
  border-bottom-right-radius: ${radius.xl}px;
  overflow: hidden;
`;

const EditButton = styled.TouchableOpacity`
  align-self: flex-end;
`;

const Avatar = styled.View`
  width: 92px;
  height: 92px;
  align-items: center;
  justify-content: center;
  border-radius: 46px;
  border: 4px solid rgba(255, 255, 255, 0.5);
  background-color: ${colors.white};
`;

const AvatarText = styled.Text`
  font-family: ${fonts.bold};
  font-size: 38px;
  color: ${colors.primary};
`;

const TrainerName = styled.Text`
  font-family: ${fonts.bold};
  font-size: 24px;
  color: ${colors.white};
  margin-top: 10px;
`;

const GymRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

const GymText = styled.Text`
  font-family: ${fonts.regular};
  font-size: 14px;
  color: ${colors.white};
  opacity: 0.9;
`;

const LevelCard = styled.View`
  margin: -40px 20px 0;
  padding: 20px;
  border-radius: ${radius.lg}px;
  background-color: ${colors.surface};
`;

const LevelHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 10px;
`;

const LevelLabel = styled.Text`
  font-family: ${fonts.bold};
  font-size: 20px;
  color: ${colors.text};
`;

const LevelXp = styled.Text`
  font-family: ${fonts.medium};
  font-size: 13px;
  color: ${colors.textMuted};
`;

const Summary = styled.View`
  flex-direction: row;
  margin-top: 16px;
`;

const SummaryItem = styled.View`
  flex: 1;
  align-items: center;
`;

const SummaryValue = styled.Text`
  font-family: ${fonts.bold};
  font-size: 20px;
  color: ${colors.text};
`;

const SummaryLabel = styled.Text`
  font-family: ${fonts.regular};
  font-size: 12px;
  color: ${colors.textMuted};
`;

const SectionTitle = styled.Text`
  font-family: ${fonts.bold};
  font-size: 20px;
  color: ${colors.text};
  margin: 24px 20px 8px;
`;

const Card = styled.View`
  flex-direction: row;
  gap: 14px;
  margin: 6px 20px;
  padding: 16px;
  border-radius: ${radius.lg}px;
  background-color: ${colors.surface};
`;

const IconCircle = styled.View<{ $color: string }>`
  width: 52px;
  height: 52px;
  align-items: center;
  justify-content: center;
  border-radius: 26px;
  border: 2px solid ${(p) => p.$color};
`;

const CardBody = styled.View`
  flex: 1;
`;

const CardHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;

const CardTitle = styled.Text`
  flex: 1;
  font-family: ${fonts.semibold};
  font-size: 15px;
  color: ${colors.text};
`;

const XpBadge = styled.Text`
  font-family: ${fonts.semibold};
  font-size: 12px;
  color: ${colors.success};
`;

const CardDescription = styled.Text`
  font-family: ${fonts.regular};
  font-size: 13px;
  color: ${colors.textMuted};
  margin-top: 2px;
`;

const ProgressRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
`;

const ProgressText = styled.Text`
  font-family: ${fonts.medium};
  font-size: 12px;
  color: ${colors.textMuted};
`;

const ClaimButton = styled.TouchableOpacity`
  align-self: flex-start;
  margin-top: 10px;
  padding: 7px 14px;
  border-radius: ${radius.pill}px;
  background-color: ${colors.success};
`;

const ClaimText = styled.Text`
  font-family: ${fonts.semibold};
  font-size: 13px;
  color: ${colors.white};
`;

const Done = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 4px;
  margin-top: 10px;
`;

const DoneText = styled.Text`
  font-family: ${fonts.medium};
  font-size: 13px;
  color: ${colors.success};
`;
