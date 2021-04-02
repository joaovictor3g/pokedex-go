import React from 'react';
import { Footer } from '../../components/Footer';
import { BackAndEditButtons, Container, EditButton, Header, ImageContainer, Main, ProfileImage, Text } from './styles';
import { MaterialIcons, Foundation } from '@expo/vector-icons';

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

                <Main>
                    <Text
                        color="#000"
                        size={30}
                        fontWeight
                    >João Victor</Text>

                    <Text 
                        color="#666"
                        size={15}
                        style={{ alignItems: 'center' }}
                    >
                        <Foundation name="marker" size={20} color="black" />
                        Ginásio de Kanto</Text>
                </Main>
            </Container>
            <Footer currentPage="profile"/>
        </>
    );
}