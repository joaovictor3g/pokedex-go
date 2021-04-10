import React, { useEffect, useState } from 'react';
import { PokemonViewBox, PokemonImage, PokemonName, OutlineType } from './styles';
import { PokemonProps } from '../../pages/PokeList';
import { IconPerType } from '../IconPerType';
import api from '../../services/api';

import typesInJSON from '../../../types.json';

interface PokemonBoxProps {
    pokemon: PokemonProps;
    color: string;
    index: number;
    handleNavigateToDetail: (index: number) => void;
    width?: number;
    background: string;
}

interface TypeProps {
   type: {
    name: string;
    url: string;
   }
}

export function PokemonBox({ color, handleNavigateToDetail, pokemon, index, background, width }: PokemonBoxProps) {
    const [types, setTypes] = useState<TypeProps[]>([]);
    const [colorType, setColorType] = React.useState<string>('');
    
    async function getTypes() {
        const response = await api.get(`${pokemon.url}`);
        
        console.log(response.data.types);
        setTypes(response.data.types.reverse());

    }

    function capitalizeFirstLetter (word: string) {
        return word.charAt(0).toUpperCase() + word.slice(1)
    }

    useEffect(() => {
        getTypes();
        
    }, []);
    
    return(
        <PokemonViewBox 
            background={colorType ? colorType : "#666"} 
            onPress={()=>handleNavigateToDetail(index)}
            width={width}
        >         
            <PokemonName
                color={color}
            >{capitalizeFirstLetter(pokemon.name)}</PokemonName>
            
            
            { types.map(type => (
               <IconPerType 
                key={type.type.name} 
                color={"#666"} 
                name={type.type.name} 
                size={20} 
                setColor={setColorType}
               />   
                
            )) }
            

            { index < 10 && <PokemonImage source={{ uri: `https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/00${index}.png`}}/> }
            { index >= 10 && index <100 && <PokemonImage source={{ uri: `https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/0${index}.png`}}/> }
            { index >= 100 &&  <PokemonImage source={{ uri: `https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${index}.png`}}/>}
        </PokemonViewBox>
    );
}