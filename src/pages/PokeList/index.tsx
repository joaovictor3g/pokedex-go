import React, { useEffect, useState } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Footer } from '../../components/Footer';
import api from '../../services/api';
import { Button, Container, GroupButton, PokemonContainer, Scroll, Search, TextButton, TypeContainer } from './styles';
import { IconPerType } from '../../components/IconPerType';
import { TypeList } from '../../components/TypeList';
import typesInJSON from '../../../types.json';
import { PokemonBox } from '../../components/PokemonBox';
import { ActivityIndicator } from 'react-native';

export interface PokemonProps {
    name: string;
    url: string;
}


export function PokeList() {
    const [pokemons, setPokemons] = useState<PokemonProps[]>([]);
    const [color, setColor] = useState('');
    const isFocused = useIsFocused();
    const { navigate } = useNavigation();
    const [buttonSelected, setButtonSelected] = useState('pokemons');

    const [nameTypesAndColors, setNameTypesAndColors] = useState(typesInJSON)
    
    async function renderPokemons() {
        try {
            const response = await api.get('/pokemon?offset=0&limit=50')
            setPokemons(response.data.results);
        } catch(err) {
            console.log(err);
        }
    }

    function handleNavigateToDetail(id: number) {
        navigate('/pokelist/detail', { id });
    }

    useEffect(() => {
        renderPokemons();
    }, [isFocused]);


    return (
        <>
            <Container>
                <Search placeholder="Pesquisar"/>
            
                <GroupButton>
                    <Button 
                        isSelected={buttonSelected==='pokemons'}
                        onPress={()=>setButtonSelected('pokemons')}
                    >
                        <TextButton>Pokémons</TextButton>
                    </Button>
                    <Button
                        isSelected={buttonSelected==='types'}
                        onPress={()=>setButtonSelected('types')}
                    >
                        <TextButton>Tipos</TextButton>
                    </Button>
                </GroupButton>
                {pokemons.length>0 ? <Scroll showsVerticalScrollIndicator={false}>
                    {buttonSelected==='pokemons' && 
                        <PokemonContainer>
                        { pokemons && pokemons.map((pokemon: PokemonProps, index: number) => { 
                            return(
                                <PokemonBox 
                                    key={pokemon.name}
                                    background=""
                                    color={color}
                                    handleNavigateToDetail={handleNavigateToDetail}
                                    index={index+1}
                                    pokemon={pokemon}
                                />
                            )
                        }) }
        
                    </PokemonContainer>}
                    
                    <TypeContainer>
                        { buttonSelected==='types' && 
                            nameTypesAndColors.map(type => (
                            <TypeList key={type._id} nameType={type.name} color={type.color}/>
                        ))}
                    </TypeContainer>
                </Scroll> : <ActivityIndicator size="small" color="blue"/>}
            </Container>

            <Footer currentPage="pokelist"/>
        </>
    );
}


