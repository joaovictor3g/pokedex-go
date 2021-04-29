import React, { useEffect, useState } from 'react';
import { Footer } from '../../components/Footer';
import { Container, Header, Text, PokemonContainer } from './styles';
import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'react-native';

import { PokemonProps } from '../PokeList';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { getPokemonsAddedToFavorites } from '../../libs/storage';
import { PokemonFavoriteBox } from '../../components/PokemonFavoriteBox ';

export function Favorites() {
    const [pokemons, setPokemons] = useState<PokemonProps[]>([]);

    const { navigate } = useNavigation();
    
    function handleNavigateToDetail(id: number) {
        navigate('/pokelist/detail', { id });
    }

    async function getFavoritePokemons() {
        try {
            const favoritePokemons = await getPokemonsAddedToFavorites();

            setPokemons(favoritePokemons.data);    

        } catch(err) {
            console.log(err);
        }   
    }

    useEffect(() => {
        getFavoritePokemons();
    }, [])

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
                        {pokemons.map((pokemon, idx: number) => (
                            <PokemonFavoriteBox 
                                key={pokemon.name}
                                padding={20}
                                background="#fff"
                                color="#000"
                                index={pokemon.id ?? 1}
                                pokemon={pokemon}
                                handleNavigateToDetail={handleNavigateToDetail}
                                width={100}
                                imageSize={200}
                            />
                        ))}
                    </ScrollView>
                </PokemonContainer>
            </Container>
            <Footer currentPage="favorites"/>
        </>
    );
}