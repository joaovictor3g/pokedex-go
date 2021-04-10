import styled from 'styled-components/native';

interface PokemonBoxProps {
    color?: string;
    width?: number;
    background?:string;
}

export const PokemonViewBox = styled.TouchableOpacity<PokemonBoxProps>`
    width: ${props => props.width ? `${props.width}%` : `${150}px`};
    height: 120px;
    background:${props => props.background ? props.background : "#666"};
    border-radius: 10px;
    margin: 2px;
    margin-bottom: 20px;
    padding: 5px;
`;

export const PokemonName = styled.Text<PokemonBoxProps>`
    color: ${props => props.color ? props.color : '#fff'};
    font-size: 18px;
    font-weight: bold;
`;

export const OutlineType = styled.View<PokemonBoxProps>`
    border-radius: 100px;
    border-width: 1px;
    border-color: ${props => props.color ? props.color: "#6666"};
    width: 30px;
    height: 30px;
    justify-content: center;
    align-items: center;
`;

export const PokemonImage = styled.Image`
    width: 80px;
    height: 80px;
    position: absolute;
    bottom: -10px;
    right: 10px;
`;