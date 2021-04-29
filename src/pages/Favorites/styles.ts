import styled from 'styled-components/native';

interface TextDefault {
    color: string;
    size: number;
    fontWeight: 'normal' | 'bold';

}

export const Container = styled.View`
    flex: 1;
    margin-top: 20px;
`;

export const Header = styled.View`
    flex-direction: row;
    margin: 20px;
    margin-top: 30px;
    justify-content: space-between;
`;

export const Text = styled.Text<TextDefault>`
    font-size: ${props => props.size}px;
    font-weight: ${props => props.fontWeight};

    color: ${props => props.color};
`;

export const PokemonContainer = styled.View`
    width: 100%;
    padding: 20px;
    height: 100%;
    margin-top: 10px;
`;