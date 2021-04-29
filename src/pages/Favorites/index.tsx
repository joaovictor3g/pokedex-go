import React, { useState } from 'react';
import { Footer } from '../../components/Footer';
import { Container, Header, Text, PokemonContainer } from './styles';
import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'react-native';

import { PokemonProps } from '../PokeList';
import { PokemonBox } from '../../components/PokemonBox';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

export function Favorites() {
    const [pokemons, setPokemons] = useState<PokemonProps[]>([
        { name: 'Bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1' }
    ]);

    const { navigate } = useNavigation();
    
    function handleNavigateToDetail(id: number) {
        navigate('/pokelist/detail', { id });
    }

    return (
        <>
            <Container>
                <Header>
                    <Text
                        color="#000"
                        size={24}
                        fontWeight="bold"
                    >
                        Favoritos
                    </Text>
                    <Feather name="more-vertical" size={24} color="black" />
                </Header>

                <PokemonContainer>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <PokemonBox 
                            padding={20}
                            background="#fff"
                            color="#000"
                            index={1}
                            pokemon={pokemons[0]}
                            handleNavigateToDetail={handleNavigateToDetail}
                            width={100}
                            imageSize={200}
                        />

                        <PokemonBox 
                            padding={20}
                            background="#fff"
                            color="#000"
                            index={1}
                            pokemon={pokemons[0]}
                            handleNavigateToDetail={handleNavigateToDetail}
                            width={100}
                            imageSize={200}
                        />
                    </ScrollView>
                </PokemonContainer>
            </Container>
            <Footer currentPage="favorites"/>
        </>
    );
}