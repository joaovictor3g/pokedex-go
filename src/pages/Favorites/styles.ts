import styled from 'styled-components/native';

interface TextDefault {
    color: string;
    size: number;
    fontWeight: 'normal' | 'bold';

}

export const Container = styled.View`
    flex: 1;
    margin-top: 20px;
    width: 100%;
`;

export const Header = styled.View`
    flex-direction: row;
    margin: 30px;
    margin-top: 30px;
    justify-content: space-between;
`;

export const Text = styled.Text<TextDefault>`
    font-size: ${props => props.size}px;
    font-weight: ${props => props.fontWeight};

    color: ${props => props.color};
`;

export const PokemonContainer = styled.View`
    flex: 1;
    width: 100%;
    padding-left: 30px;
    padding-right: 30px;
    height: 100%;
    margin-top: 10px;

`;