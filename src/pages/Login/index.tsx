import React from 'react';
import { Container, Input, Label, LoginBox, LoginButton, PokeballImage, TextButton } from './styles';
import { useNavigation } from '@react-navigation/native';

export function Login(){
    const { navigate } = useNavigation();

    function handleNavigateToListPokemons() {
        navigate('/home')
    }

    return (
        <Container>
            <LoginBox>
    
                <Label>
                    Nome do treinador
                </Label>
                <Input />

                <Label style={{ marginTop: 20 }}>
                    Ginásio atual
                </Label>
                <Input placeholder="Escolha"/>

                <LoginButton onPress={handleNavigateToListPokemons}>
                    <TextButton >
                        Entrar
                    </TextButton>
                </LoginButton>

            </LoginBox>
        </Container>
    );
}