import React, { useEffect, useState } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Footer } from '../../components/Footer';
import api from '../../services/api';
import { Button, Container, GroupButton, PokemonContainer, Scroll, Search, TextButton, TypeContainer } from './styles';
import { FlatList, ListRenderItem } from 'react-native';
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
    const [pokemonSearched, setPokemonSearched] = useState('');
    const [limit, setLimit] = useState(1);
    const [offset, setOffset] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [colorType, setColorType] = useState('');

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

    async function handleSearchPokemon() {
        const response = await api.get(`/pokemon/${pokemonSearched}`);

        setPokemons(response.data);
        
    }

    useEffect(() => {
        renderPokemons();
        
    }, []);

    const Pokemon: ListRenderItem<PokemonProps> = ({ item, index, separators }) => {
        return(
            <PokemonBox 
                key={item.name}
                background=""
                color={color}
                handleNavigateToDetail={handleNavigateToDetail}
                index={index+1}
                pokemon={item}
            />
            
        )
    }

    const renderItem: ListRenderItem<PokemonProps> = ({ item, index, separators }) => {
        return (    
            <Pokemon
                item={item}
                index={index}
                separators={separators}
            />
        );
    }

    const Loading = () => {
        if(!isLoading) 
            return null;
        return  <ActivityIndicator size="small" color="blue"/>
    };

    function renderMorePokemons() {
        setLimit(limit+2);
       //s setOffset(offset+2);
    }

    return (
        <>
            <Container>
                <Search 
                    value={pokemonSearched} 
                    onChangeText={value => setPokemonSearched(value)} 
                    placeholder="Pesquisar"

                />
                <Button onPress={handleSearchPokemon}><TextButton>ir</TextButton></Button>
            
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
                {/* {pokemons.length>0 ? <Scroll showsVerticalScrollIndicator={false}>
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
                </Scroll> : <ActivityIndicator size="small" color="blue"/>} */}
            
            <PokemonContainer>
                <FlatList 
                    style={{ flex: 1 }}
                    contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                    data={pokemons}
                    renderItem={renderItem}
                    keyExtractor={item => item.name}
                    onEndReached={renderPokemons}
                    onEndReachedThreshold={0.02}
                    ListFooterComponent={Loading}
                    numColumns={2}
                
                    
                />
            </PokemonContainer>
            
            </Container>

            <Footer currentPage="pokelist"/>
        </>
    );
}


