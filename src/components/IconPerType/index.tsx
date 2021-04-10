import React from 'react';
import { Entypo, FontAwesome5, Ionicons, MaterialCommunityIcons, AntDesign, FontAwesome } from '@expo/vector-icons';
import { OutlineType } from './styles';
interface Icon {
    name: string;
    size?: number;
    color: string;
}

export function IconPerType({ name, size, color }: Icon) {
    return (
        <OutlineType color={color}>
            {name === "grass" && <Entypo name="leaf" size={size || 24} color="#4DD8B9" />}
            {name === "poison" &&  <FontAwesome5 name="skull" size={size || 20} color="purple" />}
            {name === "fire" && <FontAwesome5 name="fire" size={size || 24} color="#ff8000" />}
            { name==="water" && <Entypo name="drop" size={size || 24} color="#0099ff" /> }
            { name === "bug" && <Ionicons name="md-bug-sharp" size={size || 24} color="#333300" /> }
            { name==="dark" && <Entypo name="moon" size={size || 24} color="#003366" /> }
            {name==="electric" && <MaterialCommunityIcons name="lightning-bolt" size={size ||24} color="#F4C947" />}
            { name==="dragon" && <FontAwesome5 name="dragon" size={size || 24} color={color} />}
            {name==='normal' && <FontAwesome5 name="egg" size={size || 24} color={color} />}
            {name==="rock" && <FontAwesome5 name="mountain" size={size || 24} color={color} />}
            {name==="fighting" && <FontAwesome5 name="fist-raised" size={size || 24} color={color} />}
            {name==="ghost" && <FontAwesome5 name="ghost" size={size || 24} color={color} />}
            {name==="psychic" && <AntDesign name="eye" size={size || 24} color={color} />}
            {name==="ice" && <FontAwesome name="snowflake-o" size={size || 24} color={color} />}
        </OutlineType>
    );
        
}   