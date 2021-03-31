import React from 'react';
import { IconPerType } from '../IconPerType';
import { Container, TypeIcon, TypeName } from './styles';
import { AntDesign } from '@expo/vector-icons';
import { View } from 'react-native';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';

interface TypeListProps {
    nameType: string;
    color: string;
}

export function TypeList({ nameType, color }: TypeListProps) {
    return (
        <Container>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TypeIcon color={color}>
                    <IconPerType name={nameType} size={30} color={color}/>
                    
                </TypeIcon>
                <TypeName>
                    {capitalizeFirstLetter(nameType)}
                </TypeName>
            </View>
            <AntDesign name="down" size={24} color="black" />
        </Container>
    );
}