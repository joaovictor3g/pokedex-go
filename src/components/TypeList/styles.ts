import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

const { width } = Dimensions.get('window');

interface ContainerProps {
    color: string;
}

export const Container = styled.TouchableOpacity`
    height: 90px;
    width: ${width-40}px;
  
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    
    margin-top: 5px;

`;

export const TypeIcon = styled.View<ContainerProps>`
    border-radius: 100px;
    border-color: ${props => props.color};
    border-width:2px;
   
    justify-content:center;
    align-items:center;
    width: 70px;
    height: 70px;
`;

export const TypeName = styled.Text`
    margin-left: 20px;
    font-size: 20px;
    color: #666;
`;