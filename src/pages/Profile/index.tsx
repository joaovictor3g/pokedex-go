import React from 'react';
import { Footer } from '../../components/Footer';
import { BackAndEditButtons, Container, EditButton, Header, ImageContainer, ProfileImage, Text } from './styles';
import { MaterialIcons } from '@expo/vector-icons';

export function Profile() {
    return (
        <>
            <Container>
                <Header>
                    <BackAndEditButtons>
                        <Text 
                            color="#fff" 
                            size={30}
                            fontWeight
                        >
                            Perfil
                        </Text>
                        <EditButton>
                            <MaterialIcons name="mode-edit" size={30} color="#fff" />
                        </EditButton>
                    </BackAndEditButtons>

                    <ImageContainer>
                        <ProfileImage source={{ uri: 'https://avatars.githubusercontent.com/u/55103977?v=4' }} resizeMode="contain"/>
                    </ImageContainer>
                </Header>
            </Container>
            <Footer currentPage="profile"/>
        </>
    );
}