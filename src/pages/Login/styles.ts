import styled from 'styled-components/native';
import { Colors } from '../../../App';

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;

`;

export const LoginBox = styled.View`
    width: 100%;
    padding: 40px;
`;

export const PokeballImage = styled.Image`
    
`;

export const Label = styled.Text`
    font-size: 18px;
    margin-bottom: 10px;
`;

export const Input = styled.TextInput<Colors>`
    width: 100%;
    background: ${props => props.theme.white};
    height: 40px;
    border-radius: 10px;
    border: 1px solid #ddd;
    text-align: center;
    font-size: 18px;
`;

export const LoginButton = styled.TouchableOpacity<Colors>`
    margin-top: 10px;
    width: 100%;
    background: ${props => props.theme.red};
    height: 40px;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
`;

export const TextButton = styled.Text`
    color: #fff;
    font-size: 18px;
`;