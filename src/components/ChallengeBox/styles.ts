import styled from "styled-components/native";

export const ChallengeViewBox = styled.View`
  width: 100%;
  height: 120px;
  background: #fff;
  justify-content: center;
  flex-direction: row;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 10px 5px 5px black;
`;

export const ChallengeWrapper = styled.View`
  width: 80%;
  justify-content: space-between;
  margin-left: 10px;
`;

export const TitleXp = styled.View`
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
`;

export const ChallengeDescription = styled.Text`
  font-size: 14px;
  color: #666;
`;

export const ChallengeTitle = styled.Text`
  font-size: 20px;
  width: 60%;
  font-weight: bold;
`;

export const ChallengeXp = styled.Text`
  font-size: 12px;
  color: #48a9e0;
`;
