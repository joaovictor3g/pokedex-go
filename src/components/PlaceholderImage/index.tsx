import React, { useState } from 'react';
import { View, Animated, Image } from 'react-native';

interface PlaceholderImageProps {
    imageUrl: string;
}

export function PlaceholderImage({ imageUrl }: PlaceholderImageProps) {
    const [opacity, setOpacity] = useState(new Animated.Value(0));

    const onLoad = (event: any) => {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true
        }).start()
    }

    return(
        <View
            style={{ 
                backgroundColor: '#EEE',
            }}
        >
            <Image 
                source={{ uri: imageUrl }}
            />

            <Animated.Image
                source={{ uri: imageUrl }}
                style={[
                    { position: 'absolute', opacity }
                ]}
                onLoad={onLoad}
            />
        </View>
    );
}