import React, { useEffect, useState } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Footer } from '../../components/Footer';
import { SearchPokemon } from '../../components/SearchPokemon';
import api from '../../services/api';
import { Button, Container, GroupButton, PokemonContainer, Scroll, Search, TextButton, TypeContainer } from './styles';
import { FlatList, ListRenderItem } from 'react-native';
import { TypeList } from '../../components/TypeList';
import typesInJSON from '../../../types.json';
import { PokemonBox } from '../../components/PokemonBox';
import { ActivityIndicator } from 'react-native';

export interface PokemonProps {
    name: string;
    url?: string;
    id?:number;
}

export function PokeList() {
    const [pokemons, setPokemons] = useState<PokemonProps[]>([]);
    const [color, setColor] = useState('');
    const isFocused = useIsFocused();
    const { navigate } = useNavigation();
    const [buttonSelected, setButtonSelected] = useState('pokemons');

    const [nameTypesAndColors, setNameTypesAndColors] = useState(typesInJSON)
    const [pokemonSearched, setPokemonSearched] = useState('');
    const [limit, setLimit] = useState(8);
    const [offset, setOffset] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [colorType, setColorType] = useState('');

    const [isButtonSearchPressed, setIsButtonSearchPressed] = useState(false);

    async function renderPokemons() {
        if(isLoading)  return;
        try {
            setIsLoading(true);
            const response = await api.get(`/pokemon?offset=${offset}&limit=${limit}`)
        
            setPokemons([...pokemons, ...response.data.results]);
            
            setOffset(offset+limit);
            // setLimit(limit+offset);
            setIsLoading(false);
            
            
        } catch(err) {
            console.log(err);
        }
    }

    function handleNavigateToDetail(id: number) {
        navigate('/pokelist/detail', { id });
    }

    function handleSearchPokemon() {
        setIsButtonSearchPressed(true);
        
    }

    useEffect(() => {
        renderPokemons();
        
    }, []);

    const Loading = () => {
        if(!isLoading) 
            return null;
        return  <ActivityIndicator size="small" color="blue"/>
    };

    return (
        <>
            <Container>
                <Search 
                    value={pokemonSearched} 
                    onChangeText={value => setPokemonSearched(value)} 
                    placeholder="Pesquisar"

                />
                <Button onPress={handleSearchPokemon}>
                    <TextButton>ir</TextButton>
                </Button>
            
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
                
                { (buttonSelected==='pokemons') && 
                    <PokemonContainer>
                        {!isButtonSearchPressed ? 
                        <FlatList 
                            style={{ flex: 1 }}
                            contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                            data={pokemons}
                            renderItem={({ item, index }) => (
                                <PokemonBox 
                                    key={item.name}
                                    background=""
                                    color={color}
                                    handleNavigateToDetail={handleNavigateToDetail}
                                    index={index+1}
                                    pokemon={item}
                                />
                            )}
                            keyExtractor={item => item.name}
                            onEndReached={renderPokemons}
                            onEndReachedThreshold={0.02}
                            ListFooterComponent={Loading}
                            numColumns={2}


                        /> : 
                        <SearchPokemon pokemonSearched={pokemonSearched}/>}
                    </PokemonContainer>
                }

                <Scroll showsVerticalScrollIndicator={false}>
                    <TypeContainer>
                        { buttonSelected==='types' && 
                            nameTypesAndColors.map(type => (
                            <TypeList key={type._id} nameType={type.name} color={type.color}/>
                        ))}
                    </TypeContainer>
                </Scroll>
                 {/* : <ActivityIndicator size="small" color="blue"/>} */}
        
            </Container>
            <Footer currentPage="pokelist"/>
        </>
    );
}


