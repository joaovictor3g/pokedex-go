import styled from 'styled-components/native';

interface Button {
    isSelected?:boolean;
};

export const Container = styled.View`
    flex: 1;
    align-items: center;
    padding-top: 40px;
   
    
`;

export const Search = styled.TextInput`
    font-size: 18px;
    width: 100%;
    text-align: center;
`;

export const GroupButton = styled.View`
    margin-top: 20px;
    flex-direction: row;
    
    justify-content:space-between;
    width: 50%;
`;

export const Button = styled.TouchableOpacity<Button>`
    border-bottom-width: ${props => props.isSelected ? `${2}px`: 0};
`;

export const TextButton = styled.Text`
    font-size: 18px;
`;

export const PokemonContainer = styled.View`
    width: 100%;
    padding: 2%;
    height: 100%;
    flex-direction: row;

    flex-wrap: wrap;
    margin-top: 10px;
`;

export const TypeContainer = styled.View`
    width: 100%;
    padding: 2%;
    height: 100%;
`;

export const Scroll = styled.ScrollView`

`;