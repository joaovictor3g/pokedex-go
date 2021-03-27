import React, { useEffect, useState } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Footer } from '../../components/Footer';
import api from '../../services/api';
import { Button, Container, GroupButton, PokemonContainer, Scroll, Search, TextButton, PokemonBox, PokemonName, PokemonImage } from './styles';

interface PokemonProps {
    name: string;
    url: string;
}

interface TypeProps {
    type: {
        name: string;
    };
}

// "fire" | "poison" | "grass" | "psychic" | "ice" |  
//         "flying" | "normal" | "water" | "dark" | "bug" | "electric" 
//         | "fairy" | "fighting" | "dragon" | "ghost" | "ground" | "steel" | "rock";
export function PokeList() {
    const [pokemons, setPokemons] = useState<PokemonProps[]>([]);
    const [types, setTypes] = useState<TypeProps[]>([]);
    const [serializedTypes, setSerializedTypes] = useState<string[]>([]);
    const [color, setColor] = useState('');
    const isFocused = useIsFocused();
    const { navigate } = useNavigation();

    const [nameTypesAndColors, setNameTypesAndColors] = useState([
        { 
            _id: 1,
            name: "fire",
            color: "#ff8000"
        },
        {
            _id: 2,
            name: "poison",
            color: "#730099"
        },
        {
            _id:3,
            name: "grass",
            color: "#00e600"
        },
        {
            _id: 4,
            name: "psychic",
            color: "#d24dff"
        },
        {
            _id: 5,
            name: "ice",
            color: "#80e5ff"
        },
        {
            _id: 6,
            name: "flying",
            color: "#1affff"
        },
        {
            _id: 7,
            name: "normal",
            color: "#a3a375"
        },
        {
            _id: 8,
            name: "water",
            color: "#0099ff"
        },
        {
            _id: 9,
            name: "dark",
            color: "#003366"
        },
        {
            _id: 10,
            name: "rock",
            color: "#b37700"
        },
        {
            _id: 11,
            name: "bug",
            color: "#333300"
        },
        {
            _id: 12,
            name: "electric",
            color: "#ffff33"
        },
        {
            _id: 13,
            name: "fairy",
            color: "#ff4d88"
        },
        {
            _id: 14,
            name: "fighting",
            color: "#ff3300"
        },
        {
            _id: 15,
            name: "dragon",
            color: "#008fb3"
        },
        {
            _id: 16,
            name: "ghost",
            color: "#000080"
        },
        {
            _id: 17,
            name: "ground",
            color: "#4d2600"
        },
        {
            _id: 18,
            name: "steel",
            color: "#33ff99"
        }
    ])
    
    async function renderPokemons() {
        try {
            const response = await api.get('/pokemon?offset=0&limit=9')
            setPokemons(response.data.results);
        } catch(err) {
            console.log(err);
        }
    }

    async function getTypes(_id: number) {
        try{   
            const response = await api.get(`/pokemon/${_id}`);

            setTypes(response.data.types);                
            setSerializedTypes(types.map((type) => type.type.name)) 
            
            nameTypesAndColors.forEach(item => {
                if(item.name===serializedTypes[0]) {
                    console.log(item.color);
                    const colorType: string = item.color;
                    setColor(colorType);

                }
            });
        
        } catch(err) {

        }
    }

    function handleNavigateToDetail(id: number) {
        navigate('/pokelist/detail', { id });
    }

    useEffect(() => {
        renderPokemons();
        // getTypes(1);
    }, [isFocused]);

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
                        { pokemons && pokemons.map((pokemon: PokemonProps, index: number) => {
                            
                            // { getTypes(index+1)}
                            return(
                                <PokemonBox key={pokemon.name} color={"#ddd"} onPress={()=>handleNavigateToDetail(index+1)}>
                                    <PokemonName>{pokemon.name}</PokemonName>
                                    { index < 10 && <PokemonImage source={{ uri: `https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/00${index+1}.png`}}/> }
                                    {/* { index >= 10 && index <100 && <PokemonImage source={require(`../../images/0${index+1}.png`)}/> }
                                    { index >= 100 &&  <PokemonImage source={require(`../../images/${index+1}.png`)}/>} */}
                                </PokemonBox>)
                            
                        }) }
        
                    </PokemonContainer>
                </Scroll>
            </Container>

            <Footer currentPage="pokelist"/>
        </>
    );
}