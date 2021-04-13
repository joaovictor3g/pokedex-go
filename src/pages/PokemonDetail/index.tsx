import React, { useEffect, useState } from 'react';
import { About, ActionButtons, BackFavButtonsView, Button, Container, HeaderButton, NormalText, PokeImage, PokemonInfoBox, PokemonNameAndId, PokemonProfile, PokemonView, ProgressStatsBar, Separator, Stats, StatusBar, Text, Type, TypeView } from './styles';
import { useRoute } from '@react-navigation/native';
import { Footer } from '../../components/Footer';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import { ActivityIndicator, View } from 'react-native';
import { IconPerType } from '../../components/IconPerType';
import { MaterialCommunityIcons, Ionicons, MaterialIcons } from '@expo/vector-icons';
import typesInJSON from '../../../types.json';

interface TypeProps {
    type: {
        name: string;
    };
}

interface PokemonProps {
    name: string;
    types: TypeProps[];
};

interface StatsProps {
    base_stat: number,
    effort: number,
    stat: {
        name: string,
        url: string, 
    }
}

interface FlavorText {
    flavor_text: string,
    language: {
        name: string,
    },
    version: {
        name: string;
    }
};

interface TypeJSONProps {
    _id: number;
    name: string;
    color: string;
}

export function PokemonDetail(){
    const isFocused = useIsFocused();
    const { params } = useRoute();
    const { id } = params as { id: number };
    const [name, setName] = useState('');
    const [types, setTypes] = useState([]);
    const [serializedTypes, setSerializedTypes] = useState<string[]>([]);
    const [colors, setColors] = useState<string[]>([]);
    const [stats, setStats] = useState<StatsProps[]>([]);
    const [btnSelected, setBtnSelected] = useState('stats');
    const [uniqueDescription, setUniqueDescription] = useState([]);

    const [pokemon, setPokemon] = useState({} as PokemonProps);
    const nameTypesAndColors = typesInJSON;

    function capitalizeFirstLetter (word: string) {
        return word.charAt(0).toUpperCase() + word.slice(1)
    }

    async function getDetail () {
        const response = await api.get(`/pokemon-species/${id}`)
        let obj: string[] = []
    
        response.data.flavor_text_entries.map((desc: FlavorText) => (
          obj.push(desc.version.name)
        ))
    
        /* Pegando a primeira descrição em inglês */
        for (var i = 0; i < obj.length; i++) {
          if (response.data.flavor_text_entries[i].language.name === 'en' && response.data.flavor_text_entries[i].version.name === obj[i]) {
            setUniqueDescription(response.data.flavor_text_entries[i].flavor_text)
            
          }
        }
      }

    async function getInfoPokemon() {
        try {
            const res = await api.get(`/pokemon/${id}`)
            setPokemon(res.data);
            setName(res.data.name);
            setTypes(res.data.types);
            setStats(res.data.stats);
            setSerializedTypes(res.data.types.map((type: TypeProps) => type.type.name));

            let arr: string[] = [];
            

            res.data.types.map((serializedType: TypeProps) => {
                nameTypesAndColors.map(nameTypeAndColor => {
                    if(serializedType.type.name === nameTypeAndColor.name) {
                        console.log("entrou")
                        arr.push(nameTypeAndColor.color)
                        
                    }
                })
            });
            console.log(arr);
            setColors(arr);
            getDetail();
            
        } catch(err) {

        }
    }
    useEffect(() => {
        getInfoPokemon()
        
    }, [isFocused]);
    
    function getColors() {
        
    }

    const navigation = useNavigation();

    function handleGoBack() {
        navigation.goBack();
    }

    function adjustStatsParameters(stat: string) {
        if(stat==="hp")
            return "HP"
        else if(stat==="attack")
            return "Attack"
        else if(stat==="defense")
            return "Defense"
        else if(stat==="special-attack")
            return "Sp. Atk"
        else if(stat==="special-defense")
            return "Sp. Def"
        else if(stat==="speed")
            return "Speed"
    }

    const [colorType, setColorType] = useState('');
    function handleChangeColor(color: string) {
        setColorType(color);
    }

   
    return (
        <>
            <Container>
                {(name && types.length>0 && stats.length>0 && colors.length>0 && serializedTypes.length>0) ?
                (<PokemonView color={colors ? colors[0] : "#666"}>
                    <PokemonProfile>
                        <MaterialCommunityIcons 
                            name="pokeball" 
                            size={200} 
                            color="#ccc" 
                            style={{
                                position: 'absolute',
                                top: 20,
                                left: 20
                            }} 
                        />

                        <MaterialCommunityIcons 
                            name="pokeball" 
                            size={100} 
                            color="#ccc" 
                            style={{
                                position: 'absolute',
                                bottom: -35,
                                right: -20
                            }} 
                        />

                        <BackFavButtonsView>
                            <HeaderButton onPress={handleGoBack}>
                                <Ionicons name="arrow-back" size={30} color="#fff" />
                            </HeaderButton>
                            <HeaderButton>
                                <MaterialIcons name="favorite-border" size={30} color="#fff" />
                            </HeaderButton>
                        </BackFavButtonsView>

                        <PokemonNameAndId>
                            <NormalText 
                                color="#fff"
                                fontSize={26}
                                fontWeight
                            >
                                {capitalizeFirstLetter(name)}
                            </NormalText>

                            <NormalText
                                color="#fff"
                                fontSize={26}
                                fontWeight
                            >
                                Nº {id}
                            </NormalText>
                        </PokemonNameAndId>
                                                
                    </PokemonProfile>

                    <PokemonInfoBox>
                    
                        {id < 10 && <PokeImage source={{ uri: `https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/00${id}.png` }}/>}
                        {id >=10 && id<100 && <PokeImage source={{ uri: `https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/0${id}.png` }}/>}
                        {id >= 100 && <PokeImage source={{ uri: `https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${id}.png` }}/>}
                        <TypeView>
                            { serializedTypes.map((serializedType, idx: number) => (
                                <Type key={serializedType} color={colors ? colors[idx] : "#666"}>
                                    <IconPerType 
                                        name={serializedType} 
                                        color={colorType ? colorType : "#666"} 
                                        handleChangeColor={handleChangeColor}    
                                    />
                                    <NormalText color={colors ? colors[idx] : undefined} fontSize={20}>{capitalizeFirstLetter(serializedType)}</NormalText>
                                </Type>
                            )) }
                        </TypeView>

                        <ActionButtons>
                            <Button 
                                isSelected={btnSelected==="about"}
                                onPress={() => setBtnSelected('about')}    
                            >
                                <NormalText
                                    color="#000"
                                    fontSize={18}
                                >Sobre
                            
                                </NormalText>
                            </Button>
                            <Button 
                                onPress={()=>setBtnSelected("stats")}
                                isSelected={btnSelected==="stats"}
                            >
                                <NormalText
                                    color="#000"
                                    fontSize={18}
                                >Status
                                </NormalText>
                            </Button>

                            <Button 
                                onPress={() => setBtnSelected("evolution")}
                                isSelected={btnSelected==="evolution"}
                            >
                                <NormalText
                                    color="#000"
                                    fontSize={18}
                                >Evolução
                                
                                </NormalText>
                            </Button>

                            
                        </ActionButtons>
                        <Separator />

                        {btnSelected==="stats" && 
                            <StatusBar>
                            { stats.map((stat, idx: number) => (
                                <Stats key={stat.stat.name}>
                                    <NormalText color="#666" fontSize={18} style={{ width: '20%' }}>{adjustStatsParameters(stat.stat.name)}</NormalText>
                                    <NormalText color="#6666" fontSize={18}>{stat.base_stat}</NormalText>

                                    <ProgressStatsBar >
                                        <View style={{ width: `${(stat.base_stat*100)/200}%`, backgroundColor: nameTypesAndColors[idx].color, height: 15 }}/>
                                    </ProgressStatsBar>
                                </Stats>
                            )) }
                        </StatusBar>}
                        { btnSelected==="about" && 
                            <About>
                                <Text>
                                    {uniqueDescription}
                                </Text>
                            </About>
                        }
                        {/* {btnSelected==="evolution" && <Evolutions id={id}/>} */}
                    </PokemonInfoBox>
                </PokemonView>)
                : 
                    (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" color="blue"/>
                    </View>)}

            </Container>
            <Footer currentPage="pokelist"/>
        </>
    );
}

/*
200-----100%
130-----x
200x = 13000
x = 13000/200
*/