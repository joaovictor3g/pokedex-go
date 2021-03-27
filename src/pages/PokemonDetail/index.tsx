import React, { useEffect, useState } from 'react';
import { ActionButtons, Button, Container, NormalText, PokeImage, PokemonInfoBox, PokemonNameAndId, PokemonProfile, PokemonView, ProgressStatsBar, Separator, Stats, StatusBar, Type, TypeView } from './styles';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { Footer } from '../../components/Footer';
import { useIsFocused } from '@react-navigation/native';
import api from '../../services/api';
import { ActivityIndicator, View } from 'react-native';
import { IconPerType } from '../../components/IconPerType';

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

    const [pokemon, setPokemon] = useState({} as PokemonProps);

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
            color: "#4DD8B9"
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

    function capitalizeFirstLetter (word: string) {
        return word.charAt(0).toUpperCase() + word.slice(1)
    }

    useEffect(() => {
        api.get(`/pokemon/${id}`)
            .then(res => {
                setPokemon(res.data);
                setName(res.data.name);
                setTypes(res.data.types);
                setStats(res.data.stats);
                getColors();

                console.log(stats);
                
            }).catch(err => console.log('Erro ao buscar dados'));
        

        
    }, [isFocused]);
    
    function getColors() {
        setColors([]);
        setSerializedTypes(types.map((type: TypeProps) => type.type.name));

        let arr: string[] = [];
        serializedTypes.map((serializedType: string) => {
            nameTypesAndColors.map(nameTypeAndColor => {
                if(serializedType === nameTypeAndColor.name) {
                    arr.push(nameTypeAndColor.color)
                    setColors(arr);
                }
            })
        });

        console.log(colors);
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
   
    return (
        <>
            <Container>
                {(name && types.length>0 && serializedTypes && colors.length>0 && stats) ?
                <PokemonView color={colors ? colors[0] : "#ddd"}>
                    <PokemonProfile>

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

                        <PokeImage source={{ uri: `https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/00${id}.png` }}/>
                        <TypeView>
                            { serializedTypes.map((serializedType, idx: number) => (
                                <Type key={serializedType} color={colors ? colors[idx] : "#666"}>
                                    <IconPerType name={serializedType}/>
                                    <NormalText color={colors ? "#666" : "#666"} fontSize={20}>{capitalizeFirstLetter(serializedType)}</NormalText>
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

                        <StatusBar>
                            { stats.map((stat, idx: number) => (
                                <Stats key={stat.stat.name}>
                                    <NormalText color="#666" fontSize={18} style={{ width: '20%' }}>{adjustStatsParameters(stat.stat.name)}</NormalText>
                                    <NormalText color="#6666" fontSize={18}>{stat.base_stat}</NormalText>

                                    <ProgressStatsBar >
                                        <View style={{ width: `${stat.base_stat}%`, backgroundColor: nameTypesAndColors[idx].color, height: 15 }}/>
                                    </ProgressStatsBar>
                                </Stats>
                            )) }
                        </StatusBar>
                        
                    </PokemonInfoBox>
                </PokemonView> 

                : <ActivityIndicator size="large"/>}

            </Container>
            <Footer currentPage="pokelist"/>
        </>
    );
}