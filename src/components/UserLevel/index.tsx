import React from 'react';
import { View } from 'react-native';
import { useChallengeContext } from '../../contexts/ChallengeContext';
import { LevelContainer, LevelNumber, ProgressContainer, Progress, Title, IncrementedProgress, TextXp, NormalText } from './styles';

export function UserLevel() {
    const { amount_xp: amountXp, level, experienceToNextLevel } = useChallengeContext(); 
    const barIncrementWidth = (amountXp * 100)/experienceToNextLevel;

    return (
        <LevelContainer>
            <Title>Level</Title>

            <ProgressContainer>
                <LevelNumber>{level}</LevelNumber>
                <Progress> 
                    <IncrementedProgress 
                        style={{
                            width: `${barIncrementWidth}%`,
                            backgroundColor: 'blue',
                            borderRadius: 5
                        }}
                    />
                </Progress>
                <LevelNumber>{level+1}</LevelNumber>
            </ProgressContainer>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}
            >
                <TextXp>{experienceToNextLevel} XP</TextXp>
                <NormalText> PARA O LEVEL {level+1}</NormalText>
            </View>
        </LevelContainer>
    );
}