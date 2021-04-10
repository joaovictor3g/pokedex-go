import styled from 'styled-components/native';

interface TypeParams {
    color: string;
}

interface PokemonBoxProps {
    background: string;
}

export const Container = styled.View`
    flex: 1;
    padding: 30px;
`;

export const Header = styled.View`
    flex-direction: row;
    justify-content: space-between;
    height: 30px;
`;

export const HeaderText = styled.Text`
    font-weight: bold;
    font-size: 22px;
`;

export const HeaderDownText = styled.Text`
    font-size: 18px;
    color: #6666;
`;

export const PokemonContent = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
    width: 100%;
`;  

export const Scroll = styled.ScrollView`
    width: 100%;
`;

export const PokemonName = styled.Text`
    font-size: 30px;
    font-weight: bold;
    text-align: center;
`;

export const PokemonBox = styled.View<PokemonBoxProps>`
    width: 100%;
    height: 200px;
    background: ${props => props.background};
    border-radius: 20px;
    padding: 20px;
`;

export const PokemonNumber = styled.Text`
    color: #fff;
    font-size: 18px;
`;

export const FavoriteButton = styled.TouchableOpacity`

`;

export const PokemonImage = styled.Image`
    align-items: center;    
    width: 200px;
    height: 200px;
`;

export const Types = styled.View`
    margin-top: 50px;
`;

export const TypeText = styled.Text`
    font-weight: bold;
    font-size: 20px;
`;

export const TypeView = styled.View<TypeParams>`
    flex-direction: row;
    margin-top: 10px;
    border: 2px solid ${props => props.color};
    width: 100px;
    margin-right: 10px;
    border-radius: 18px;
    height: 40px;
    align-items: center;
    justify-content: center;
    
`;

export const TypeViewText = styled.Text<TypeParams>`
    font-size: 16px;
    font-weight: bold;
    color: ${props => props.color};
`;

export const DescriptionView = styled.View`
    margin-top: 40px;
`;

export const DescriptionText = styled.Text`
    font-size: 16px;
    color:#666;
`;