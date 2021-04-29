import styled from 'styled-components/native';

interface OutlineProps {
    color: string;
}

export const OutlineType = styled.View<OutlineProps>`
    border-radius: 100px;
    width: 30px;
    height: 30px;
    justify-content: center;
    align-items: center;

`;