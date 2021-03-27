import React from 'react';
import { View } from 'react-native';
import { Footer } from '../../components/Footer';
import { Container, FavoriteButton, Header, HeaderDownText, Scroll, HeaderText, PokemonBox, PokemonContent, PokemonImage, PokemonName, PokemonNumber, Types, TypeText, TypeView, TypeViewText, DescriptionView, DescriptionText } from './styles';
import { Ionicons, EvilIcons, Entypo, FontAwesome5 } from '@expo/vector-icons';

export function Home() {
    return (
        <>
            <Container>
                <Header>
                    <View>
                        <HeaderText>
                            Olá, João Victor
                        </HeaderText>
        
                        <HeaderDownText>
                            Seu pokemon do dia
                        </HeaderDownText>
                    </View>
                    <Ionicons name="menu" size={30} color="black" />

                </Header>

                <PokemonContent>
                    <Scroll showsVerticalScrollIndicator={false}>
                        <PokemonName>Bulbasaur</PokemonName>

                        <PokemonBox>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <PokemonNumber>
                                    Nº 001
                                </PokemonNumber>
                                <FavoriteButton>
                                    <EvilIcons name="heart" size={35} color="#fff" />
                                </FavoriteButton>

                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <PokemonImage source={require('../../images/001.png')} resizeMode="contain"/>
                            </View>
                        </PokemonBox>

                        <Types>
                            <TypeText>Tipo</TypeText>

                            <View style={{ flexDirection: 'row' }}>
                                <TypeView color="#4DD8B9">
                                    <Entypo name="leaf" size={24} color="#4DD8B9" />
                                    <TypeViewText>
                                        Planta
                                    </TypeViewText>
                                
                                </TypeView>

                                <TypeView color="purple">
                                    <FontAwesome5 name="skull" size={20} color="purple" />
                                    <TypeViewText >Veneno</TypeViewText>
                                </TypeView>
                            </View>
                        </Types>

                        <DescriptionView>
                            <DescriptionText>
                                Bulbasaur pode ser visto  cochilando sob a luz
                                do sol. Há uma semente nas costas. Ao absorver
                                os raios do sol, a semente cresce
                                progressivamente maior.
                            </DescriptionText>
                        </DescriptionView>
                    </Scroll>
                </PokemonContent>
            </Container>
            <Footer currentPage="home"/>    
            
        </>
    );
}