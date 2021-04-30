import { createContext, ReactNode, useContext, useState } from 'react';

type ChallengerContextData = {
    id: number,
    title: string,
    description: string,
    challenge_type: string,
    amount_xp: number
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

    return (
        <ChallengesContext.Provider
            value={{
                id,
                title,
                description,
                challenge_type: challengeType,
                amount_xp: amountXp
            }}
        >
            {children}
        </ChallengesContext.Provider>
    );
}

export const useChallengeContext = () => {
    return useContext(ChallengesContext);
}