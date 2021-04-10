import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Footer } from '../../components/Footer';
import { Container, FavoriteButton, Header, HeaderDownText, Scroll, HeaderText, PokemonBox, PokemonContent, PokemonImage, PokemonName, PokemonNumber, Types, TypeText, TypeView, TypeViewText, DescriptionView, DescriptionText } from './styles';
import { Ionicons, EvilIcons, Entypo, FontAwesome5,MaterialCommunityIcons } from '@expo/vector-icons';
import { PokemonProps } from '../PokeList';
import api from '../../services/api';
import { IconPerType } from '../../components/IconPerType';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';

interface TypeProps {
    type: {
     name: string;
     url: string;
    }
 }

export function Home() {
    const [pokemon, setPokemon] = useState({} as PokemonProps);
    const [types, setTypes] = useState<TypeProps[]>([]);
    const [randomId, setRandomId] = useState(Math.floor(Math.random() * 800 + 1));
    const [colorType, setColorType] = useState('');

    useEffect(() => {
        console.log(randomId);
        getPokemonRandomly();
    
    }, [randomId]);

    async function getPokemonRandomly() {
        console.log(randomId);
        try {
            const response = await api.get(`/pokemon/${randomId}`);

            setPokemon(response.data);
            setTypes(response.data.types)
        } catch(err) {

        }
    }    
    
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
                        <PokemonName>{capitalizeFirstLetter(pokemon.name ?? '')}</PokemonName>

                        <PokemonBox background={colorType ? colorType: '#666'}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <MaterialCommunityIcons 
                                    name="pokeball" 
                                    size={130} 
                                    color="#6666" 
                                    style={{
                                        position: 'absolute'
                                    }} 
                                />
                                <PokemonNumber>
                                    Nº {randomId}
                                </PokemonNumber>
                                <FavoriteButton>
                                    <EvilIcons name="heart" size={35} color="#fff" />
                                </FavoriteButton>

                            </View>
                            <View style={{ alignItems: 'center' }}>
                                { randomId < 10 && <PokemonImage source={{ uri: `https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/00${randomId}.png` }} resizeMode="contain"/> }
                                { randomId >= 10 && randomId < 100 && <PokemonImage source={{ uri: `https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/0${randomId}.png` }} resizeMode="contain"/>}
                                { randomId > 100 && <PokemonImage source={{ uri: `https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${randomId}.png` }} resizeMode="contain"/> }
                            </View>
                        </PokemonBox>

                        <Types>
                            <TypeText>Tipo</TypeText>

                            <View style={{ flexDirection: 'row' }}>
                                { types.map(type => (
                                    <TypeView color={colorType}>
                                        <IconPerType 
                                            name={type.type.name} 
                                            color="#000" 
                                            size={24} 
                                            setColor={setColorType}
                                        />
                                        <TypeViewText color={colorType}> 
                                            {capitalizeFirstLetter(type.type.name)}
                                        </TypeViewText>
                                    </TypeView>
                                )) }
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