import React, { useRef, useState } from 'react';
import { View, Animated, Image } from 'react-native';

interface PlaceholderImageProps {
    imageUrl: string;
}

export function PlaceholderImage({ imageUrl }: PlaceholderImageProps) {
    const opacity = useRef(new Animated.Value(0)).current;

    const onLoad = () => {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: false
        }).start()
    };

    return(
        <View
            style={{ 
                backgroundColor: 'transparent',
                width: '100%',
                height: '100%'
            }}
        >
            <Image 
                source={require('../../../assets/favicon.png')}
            />

            <Animated.Image
                source={{ uri: "https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/001.png" }}
                style={[
                    { position: 'absolute', opacity }
                ]}
                onLoad={onLoad}
            />
        </View>
    );
}