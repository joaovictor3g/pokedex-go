import styled from "styled-components/native";

interface Text {
  size: number;
  color: string;
  fontWeight?: boolean;
}

export const Container = styled.View`
  flex: 1;
  width: 100%;
`;

export const Header = styled.View`
  width: 100%;
  height: 190px;
  background: #48a9e0;
  padding: 20px;
`;

export const BackAndEditButtons = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
`;

export const EditButton = styled.TouchableOpacity``;

export const Text = styled.Text<Text>`
  font-size: ${(props) => props.size}px;
  font-weight: ${(props) => (props.fontWeight ? "bold" : "normal")};
  color: ${(props) => props.color};
`;

export const ImageContainer = styled.View`
  position: relative;
  justify-content: center;
  align-items: center;
`;

export const ProfileImage = styled.Image`
  width: 130px;
  height: 130px;
  position: absolute;
  top: 40px;
  border-radius: 100px;
  border-width: 10px;
  border-color: #48a9e0;
`;

export const Main = styled.View`
  margin-top: 70px;
  align-items: center;
  flex: 1;
`;

export const ChallengesContainer = styled.View`
  flex: 1;
  width: 100%;
  padding: 20px;
  margin-top: 10px;
`;

export const ChallengesScroll = styled.ScrollView``;
