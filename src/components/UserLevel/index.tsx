import React from 'react';
import { LevelContainer, LevelNumber, ProgressContainer, Progress, Title } from './styles';

export function UserLevel() {
    return (
        <LevelContainer>
            <Title>Level</Title>

            <ProgressContainer>
                <LevelNumber>0</LevelNumber>
                <Progress />
                <LevelNumber>10</LevelNumber>
            </ProgressContainer>

        </LevelContainer>
    );
}