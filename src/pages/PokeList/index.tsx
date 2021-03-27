import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Footer } from '../../components/Footer';
import api from '../../services/api';
import { Button, Container, GroupButton, PokemonContainer, Scroll, Search, TextButton, PokemonBox, PokemonName, PokemonImage } from './styles';

interface PokemonProps {
    name: string;
    url: string;
}

export function PokeList() {
    const [pokemons, setPokemons] = useState([]);
    const [count, setCount] = useState(1);
    
    async function renderPokemons() {
        try {
            const response = await api.get('/pokemon?offset=0&limit=9')
            console.log(response.data);
            setPokemons(response.data.results);
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        renderPokemons();
    }, []);

    function loadImage() {
        const image = require(`../../images/001.png`);
        return image;
    }

    return (
        <>
            <Container>
                <Search placeholder="Pesquisar"/>
            
                <GroupButton>
                    <Button>
                        <TextButton>Pokémons</TextButton>
                    </Button>
                    <Button>
                        <TextButton>Tipos</TextButton>
                    </Button>
                </GroupButton>
                <Scroll>
                    <PokemonContainer>
                        { pokemons && pokemons.map((pokemon: PokemonProps, index: number) => (
                            <PokemonBox key={pokemon.name}>
                                <PokemonName>{pokemon.name}</PokemonName>
                                { index < 10 && <PokemonImage source={{ uri: `00`+count+`.png`}} style={{ width: 100, height: 100 }}/> }
                                {/* { index >= 10 && index <100 && <PokemonImage source={require(`../../images/0${index+1}.png`)}/> }
                                { index >= 100 &&  <PokemonImage source={require(`../../images/${index+1}.png`)}/>} */}
                            </PokemonBox>
                        )) }
        
                    </PokemonContainer>
                </Scroll>
            </Container>

            <Footer currentPage="pokelist"/>
        </>
    );
}