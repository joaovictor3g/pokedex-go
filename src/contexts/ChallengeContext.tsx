import React,{ createContext, ReactNode, useContext, useState } from 'react';

type ChallengerContextData = {
    id: number,
    title: string,
    description: string,
    challenge_type: string,
    amount_xp: number;
    level: number;
    experienceToNextLevel: number;
    levelUp: (xp: number) => void;
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

    const [level, setLevel] = useState(0);

    const experienceToNextLevel = Math.pow((level+1)*4, 5)

    function levelUp(xp: number) {
        setAmountXp(xp);
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
                levelUp
            }}
        >
            {children}
        </ChallengesContext.Provider>
    );
}

export const useChallengeContext = () => {
    return useContext(ChallengesContext);
}