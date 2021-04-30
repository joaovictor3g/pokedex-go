import styled from 'styled-components/native';

export const LevelContainer = styled.View`

    justify-content: center;
    margin-top: 10px;
`;

export const ProgressContainer = styled.View`
    flex-direction: row;
    width: 100%;
    align-items: center;
`;

export const Progress = styled.View`
    width: 80%;
    height: 10px;
    background: #ccc;
    border-radius: 5px;
    margin-left: 5px;
    margin-right: 5px;
    margin-top: 5px;
`;

export const Title = styled.Text`
    font-size: 18px;
    text-align: left;
    font-weight: bold;
    width: 100%;
`;

export const IncrementedProgress = styled.View`
    height: 10px;
`;

export const LevelNumber = styled.Text``;

export const TextXp = styled.Text`
    color: #48A9E0;
`;

export const NormalText = styled.Text`
    color: #666;
`;