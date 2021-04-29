import styled from 'styled-components/native';

interface PokemonBoxProps {
    color?: string;
    width?: number;
    background?:string;
    padding?: number;
    imageSize?:number;
}

export const PokemonViewBox = styled.View<PokemonBoxProps>`
    width: 100%;
    height: 120px;
    background:${props => props.background ? props.background: "#666"};
    border-radius: 10px;
    /* margin: 1px; */
    /* margin-bottom: 20px; */
    padding: ${props => props.padding ? `${props.padding}px`: `${5}px`};
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

export const PokemonImage = styled.Image<PokemonBoxProps>`
    position: absolute;
    right: 10px;
    width: 80px;
    height: 80px;
`;