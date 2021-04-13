import styled from 'styled-components/native';

interface NormalTextProps {
    color?: string;
    fontSize?: number;
    fontWeight?:boolean;
};

interface SelectedButton {
    isSelected?: boolean;
}

export const Container = styled.View`
    flex: 1;
`;

export const BackFavButtonsView = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const HeaderButton = styled.TouchableOpacity`
`;


export const PokemonView = styled.View<NormalTextProps>`
    background: ${props=>props.color  ? props.color : "#666"};
    width: 100%;
    height: 100%;
    position: relative;

`;

export const PokemonProfile = styled.View`
    height: 50%;
    padding: 30px;
`;

export const PokemonInfoBox = styled.View`
    background: #F1f1f0;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    height: 100%;
    align-items: center;
    padding: 10px;
`;

export const PokemonNameAndId = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const NormalText = styled.Text<NormalTextProps>`
    font-size: ${props=>props.fontSize}px;
    color: ${props=>props.color ? props.color : "#666"};
    font-weight: ${props => props.fontWeight ? 'bold':'normal'}
`;

export const PokeImage = styled.Image`
    width: 200px;
    height: 200px;
    position: absolute;
    top: -160px;
`;

export const TypeView = styled.View`
    margin-top: 50px;
    flex-direction: row;
    width: 65%;
    justify-content: center;
    align-items: center;

    
`;

export const Type = styled.View<NormalTextProps>`
    border: 2px solid ${props => props.color ? props.color : "#666"};
    border-radius: 14px;

    height: 40px;
    width: 110px;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    margin: 2px;
    
`;

export const ActionButtons = styled.View`
    flex-direction: row;
    margin-top: 10px;
    width: 70%;
    justify-content: space-between;
`;

export const Button = styled.TouchableOpacity<SelectedButton>`
    border-bottom-width: ${props => props.isSelected ? `${2}px`:0};

`;

export const Separator = styled.View`
    height: 2px;
    width: 100%;
    background: #ccc;
    
`;

export const StatusBar = styled.View`
    margin-top: 10px;
    width: 100%;
`;

export const Stats = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const ProgressStatsBar = styled.View`
    width: 60%;
    height: 15px;
    background: #ddd;
`;

export const About = styled.View`
    margin-top: 10px;
    width: 100%;
    justify-content: center;

`;

export const Text = styled.Text`
    font-size: 16px;
    text-align: center;
`;