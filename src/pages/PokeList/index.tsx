import React, { useEffect, useState } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Footer } from '../../components/Footer';
import api from '../../services/api';
import { Button, Container, GroupButton, PokemonContainer, Scroll, Search, TextButton, TypeContainer } from './styles';
import { IconPerType } from '../../components/IconPerType';
import { TypeList } from '../../components/TypeList';
import typesInJSON from '../../../types.json';
import { PokemonBox } from '../../components/PokemonBox';

export interface PokemonProps {
    name: string;
    url: string;
}

interface TypeProps {
    type: {
        name: string;
    };
}

export function PokeList() {
    const [pokemons, setPokemons] = useState<PokemonProps[]>([]);
    const [types, setTypes] = useState<TypeProps[]>([]);
    const [serializedTypes, setSerializedTypes] = useState<string[]>([]);
    const [color, setColor] = useState('');
    const isFocused = useIsFocused();
    const { navigate } = useNavigation();
    const [buttonSelected, setButtonSelected] = useState('pokemons');

    const [nameTypesAndColors, setNameTypesAndColors] = useState(typesInJSON)
    
    async function renderPokemons() {
        try {
            const response = await api.get('/pokemon?offset=0&limit=30')
            setPokemons(response.data.results);
        } catch(err) {
            console.log(err);
        }
    }

    async function getTypes(_id: number): Promise<{ types: string[]; color: string; } | undefined> {
        try{  
            const response = await api.get(`/pokemon/${_id}`);

            setTypes(response.data.types);                
            setSerializedTypes(types.map((type) => type.type.name)) 
            
            nameTypesAndColors.forEach(item => {
                if(color!=='')
                    return;
                if(item.name===serializedTypes[0]) {
                    
                    const colorType: string = item.color;
                    setColor(colorType);
                    
                }
            });
            return { types:serializedTypes, color: color };
        } catch(err) {
        
        }
    }

    function getIntermediateTypes(_id: number) {
        getTypes(1).then(res =>{
            if(res) {
                console.log(res);
                setSerializedTypes(res.types);
                setColor(res.color);
                return true;
            }
        })

        return false;
    }

    function handleNavigateToDetail(id: number) {
        navigate('/pokelist/detail', { id });
    }

    useEffect(() => {
        renderPokemons();
        // getTypes(4).then(res => console.log(res));
        // getTypes(1);
        // [1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => {
        //     console.log(num)
        //     getTypes(num).then(res => console.log(res))
        // })
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
                <Scroll showsVerticalScrollIndicator={false}>
                    {buttonSelected==='pokemons' && 
                        <PokemonContainer>
                        { pokemons && pokemons.map((pokemon: PokemonProps, index: number) => { 
                            return(
                                <PokemonBox 
                                    key={pokemon.name}
                                    background="#666"
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
                </Scroll>
            </Container>

            <Footer currentPage="pokelist"/>
        </>
    );
}


