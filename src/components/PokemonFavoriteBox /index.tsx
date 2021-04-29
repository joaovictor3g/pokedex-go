import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { PokemonViewBox, PokemonImage, PokemonName, OutlineType } from './styles';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import { PokemonProps } from '../../pages/PokeList';
import { IconPerType } from '../IconPerType';
import api from '../../services/api';
import { Feather, Ionicons } from '@expo/vector-icons';

import typesInJSON from '../../../types.json';
import { Animated, View } from 'react-native';

interface PokemonBoxProps {
    pokemon: PokemonProps;
    color: string;
    index: number;
    handleNavigateToDetail: (index: number) => void;
    width?: number;
    background?: string;
    padding?: number;
    imageSize?:number;
    setColorType?: Dispatch<SetStateAction<string>>;
    colorType?:string;
    handleRemovePokemon: () => void;
}

interface TypeProps {
   type: {
    name: string;
    url: string;
   }
}

export function PokemonFavoriteBox({ 
    color, 
    handleNavigateToDetail, 
    pokemon, 
    index, 
    background, 
    width,
    padding,
    imageSize,
    handleRemovePokemon
}: PokemonBoxProps) {
    const [types, setTypes] = useState<TypeProps[]>([]);
    const [colorType, setColorType] = useState<string>('');
    
    async function getTypes() {
        const response = await api.get(`pokemon/${pokemon.id}`);
    
        setTypes(response.data.types.reverse());
    }

    function capitalizeFirstLetter (word: string) {
        return word.charAt(0).toUpperCase() + word.slice(1)
    }

    function handleChangeColor(color: string) {
        setColorType(color);
    }


    useEffect(() => {
        getTypes();
        
    }, []);
    
    return(
        <Swipeable
            containerStyle={{
                
            }}
            overshootLeft={false}
            overshootRight={false}
            renderLeftActions={()=>(
                <Animated.View style={{
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <View >
                        <RectButton
                            style={{
                                width: 100,
                                height: 120,
                                backgroundColor: "blue",
                                
                                borderRadius: 20,
                                justifyContent: 'center',
                                position: 'relative',
                                left: 20,
                                
                                alignItems: 'center'
                            }}
                            onPress={()=>handleNavigateToDetail(index)}
                        >
                            <Ionicons name="ios-information-circle" size={34} color="#FFF" />
                        </RectButton>
                    </View>
                </Animated.View>
            )}
            renderRightActions={() => (
                <Animated.View style={{
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <View >
                        <RectButton
                            style={{
                                width: 100,
                                height: 120,
                                backgroundColor: "red",
                                borderRadius: 20,
                                justifyContent: 'center',
                                position: 'relative',
                                right: 20,
                                alignItems: 'center'
                            }}
                            onPress={handleRemovePokemon}
                        >
                            <Feather name="trash" size={24} color="#FFF"/>
                        </RectButton>
                    </View>
                </Animated.View>
            )}>
            <PokemonViewBox 
                background={background ? background : (colorType ?? "#666")} 
                width={width}
                padding={padding}
                imageSize={imageSize}
            >         
                <PokemonName
                    color={color}
                >{capitalizeFirstLetter(pokemon.name)}</PokemonName>
                
                
                { types.map((type, idx: number) => (
                    <View
                        key={idx} 
                        style={{
                            width: 30,
                            height: 30,
                            borderRadius: 100,
                            borderWidth:1,
                            borderColor: '#ddd',
                            marginTop: 5,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <IconPerType 
                            
                            color={"#666"} 
                            name={type.type.name} 
                            size={20} 
                            handleChangeColor={handleChangeColor}
                        />   
                    </View>
                    
                )) }
                

                { index < 10 && <PokemonImage source={{ uri: `https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/00${index}.png`}} resizeMode="contain"/> }
                { index >= 10 && index <100 && <PokemonImage source={{ uri: `https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/0${index}.png`}} resizeMode="contain"/> }
                { index >= 100 &&  <PokemonImage source={{ uri: `https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${index}.png`}} resizeMode="contain" />}
            </PokemonViewBox>
        </Swipeable>
    );
}