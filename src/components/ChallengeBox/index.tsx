import React from 'react';
import { Animated, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import { IconPerType } from '../IconPerType';
import { ChallengeViewBox, ChallengeDescription, ChallengeTitle, ChallengeWrapper, ChallengeXp, TitleXp } from './styles';
 
import { AntDesign } from '@expo/vector-icons';
import { useChallengeContext } from '../../contexts/ChallengeContext';

type ChallengeBoxProps = {
    id: number;
    title: string;
    description: string;
    amountXp: number;
    challengeType: string; 
};

export function ChallengeBox(props: ChallengeBoxProps) {
    const { incrementProgressStatus } = useChallengeContext();

    return (
        <Swipeable
            overshootRight={false}
            renderRightActions={() => (
                <Animated.View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <View >
                        <RectButton
                            style={{
                                width: 100,
                                height: 120,
                                backgroundColor: "green",
                                
                                borderRadius: 20,
                                justifyContent: 'center',
                                position: 'relative',
                                right: 20,
                                
                                alignItems: 'center'
                            }}
                            onPress={() => incrementProgressStatus(props.amountXp)}
                        >
                            <AntDesign 
                                name="checkcircleo" 
                                size={30} 
                                color="#fff" 
                            />
                        </RectButton>
                    </View>
                </Animated.View>
            )}
        >
            <ChallengeViewBox>
                <View
                    style={{
                        borderWidth: 1,
                        borderColor: '#ddd',
                        borderRadius: 100,
                        height: 65,
                        width: 65,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <IconPerType 
                        name={props.challengeType}
                        color=""
                        handleChangeColor={()=>{}}
                        size={30}
                    />
                </View>
                <ChallengeWrapper>
                    <TitleXp>
                        <ChallengeTitle>{props.title}</ChallengeTitle>
                        <ChallengeXp>+{props.amountXp} XP</ChallengeXp>
                    </TitleXp>

                    <ChallengeDescription>
                        {props.description}
                    </ChallengeDescription>
            
                </ChallengeWrapper>
            </ChallengeViewBox>
        </Swipeable>
    );
}