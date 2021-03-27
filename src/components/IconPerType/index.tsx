import React, { useContext } from 'react';
import { Entypo, FontAwesome5 } from '@expo/vector-icons';
import { ThemeContext } from 'styled-components';
import { ThemeProvider } from '@react-navigation/native';

interface Icon {
    name: string;
}

export function IconPerType({ name }: Icon) {
    return (
        <>
            {name === "grass" && <Entypo name="leaf" size={24} color="#4DD8B9" />}
            {name === "poison" &&  <FontAwesome5 name="skull" size={20} color="purple" />}
            {name === "fire" && <FontAwesome5 name="fire" size={24} color="#ff8000" />}
            { name==="water" && <Entypo name="drop" size={24} color="#0099ff" /> }
        </>
    );
        
}