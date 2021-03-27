import styled from 'styled-components/native';

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

export const Button = styled.TouchableOpacity`
    /* border-bottom-width: 1px; */
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

export const Scroll = styled.ScrollView`

`;

export const PokemonBox = styled.View`
    width: 32%;
    height: 120px;
    background:#4DD8B9;
    border-radius: 10px;
    margin: 2px;
    margin-bottom: 50px;
    padding: 5px;
`;

export const PokemonName = styled.Text`
    color: #fff;
    font-size: 18px;
`;

export const PokemonImage = styled.Image`
    width: 80px;
    height: 80px;
    position: absolute;
    bottom: -10px;
    right: 10px;
`;