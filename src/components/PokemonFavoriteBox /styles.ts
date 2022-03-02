import styled from "styled-components/native";

interface PokemonBoxProps {
  color?: string;
  width?: number;
  background?: string;
  padding?: number;
  imageSize?: number;
}

export const PokemonViewBox = styled.View<PokemonBoxProps>`
  width: 100%;
  height: 140px;
  background: ${(props) => (props.background ? props.background : "#666")};
  border-radius: 10px;
  padding: 10px;
`;

export const PokemonName = styled.Text<PokemonBoxProps>`
  color: #666;
  font-size: 18px;
`;

export const PokemonId = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #000;
`;

export const OutlineType = styled.View<PokemonBoxProps>`
  border-radius: 100px;
  border-width: 1px;
  border-color: ${(props) => (props.color ? props.color : "#6666")};
  width: 30px;
  height: 30px;
  justify-content: center;
  align-items: center;
`;

export const PokemonImage = styled.Image<PokemonBoxProps>`
  position: absolute;
  right: 10px;
  width: 90px;
  height: 90px;
`;
