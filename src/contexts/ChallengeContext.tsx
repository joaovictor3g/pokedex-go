import React,{ createContext, ReactNode, useContext, useState } from 'react';
import { LevelUpModal } from '../components/LevelUpModal';

type ChallengerContextData = {
    id: number,
    title: string,
    description: string,
    challenge_type: string,
    amount_xp: number;
    level: number;
    experienceToNextLevel: number;
    levelUp: (xp: number) => void;
    incrementProgressStatus: (xp: number) => void;
};

type ChallengerProviderProps = {
    children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengerContextData);

export function ChallengesProvider({ children }: ChallengerProviderProps) {
    const [id, setId] = useState(0);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [challengeType, setChallengeType] = useState('');
    const [amountXp, setAmountXp] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);

    const [level, setLevel] = useState(0);

    const experienceToNextLevel = Math.pow((level+1)*4, 3)

    function incrementProgressStatus(xp: number) {
        setAmountXp(amountXp + xp);

        if(xp+amountXp > experienceToNextLevel) 
            levelUp();
    }

    function levelUp() {
        setLevel(level+1);
        // setModalVisible(true);
    }

    return (
        <ChallengesContext.Provider
            value={{
                id,
                title,
                description,
                challenge_type: challengeType,
                amount_xp: amountXp,
                experienceToNextLevel,
                level,
                levelUp,
                incrementProgressStatus
            }}
        >
            {children}
            { modalVisible && <LevelUpModal />}
        </ChallengesContext.Provider>
    );
}

export const useChallengeContext = () => {
    return useContext(ChallengesContext);
}