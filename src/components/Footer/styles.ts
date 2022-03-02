import styled from "styled-components/native";
import { Colors } from "../../../App";

interface ResourceProps {
  color: string;
  isResourceEqualToPage?: boolean;
}

export const Container = styled.View<Colors>`
  height: 80px;
  background: ${(props) => props.theme.white};
  border-radius: 30px;
  justify-content: center;
  padding: 25px;
`;

export const Resources = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Resource = styled.TouchableOpacity<ResourceProps>`
  flex-direction: row;
  align-items: center;
  background: ${(props) =>
    props.isResourceEqualToPage ? props.color : "transparent"};
  border-radius: 50px;
  width: ${(props) => (props.isResourceEqualToPage ? `${110}px` : `${50}px`)};
  height: 40px;
  justify-content: center;
`;

export const ResourceText = styled.Text`
  margin-left: 5px;
  color: #fff;
  font-size: 15px;
`;
