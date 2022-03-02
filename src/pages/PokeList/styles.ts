import styled from "styled-components/native";

interface Button {
  isSelected?: boolean;
}

export const Container = styled.View`
  flex: 1;
  align-items: center;
  padding-top: 40px;
`;

export const SearchContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  /* border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px; */
`;

export const Search = styled.TextInput`
  font-size: 18px;
  text-align: center;
`;

export const Button = styled.TouchableOpacity<Button>`
  border-bottom-width: ${(props) => (props.isSelected ? `${2}px` : 0)};
`;

export const PokemonContainer = styled.View`
  flex: 1;
  width: 100%;
  padding: 2%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 10px;
`;
