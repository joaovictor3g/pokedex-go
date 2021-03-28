import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { EvolutionContainer, Image } from './styles';

interface Evolution {
    id: number;
};

interface EvolutionProps {
    chain: {
        evolves_to: {
            evolution_details: {
                min_level: number
            }[];
            evolves_to: {
                evolution_details: {
                    min_level: number
                }[];
                species: {
                    name: string;
                    url: string;
                }
            }[]
            species: {
                name: string;
                url: string;
            }
        }[];
        species: {
            name: string;
            url: string;
        }
    }
}

export function Evolutions({ id }: Evolution) {
    const [evolutions, setEvolutions] = useState({} as EvolutionProps);
    const [ids, setIds] = useState<string[]>([]);

    async function getEvolutionsById() {
        let arr: string[] = [];
        const response = await api.get(`evolution-chain/${id}`);
        arr.push(String(id));
        setEvolutions(response.data);
        const word = evolutions.chain.species.url.lastIndexOf('s');
        const word2 = evolutions.chain.species.url.lastIndexOf('/');
        
        
        let word3: string = "";
        for(var i = word+2; i<word2; i++)
            word3+=evolutions.chain.species.url[i]
    
        
        const lastIndexOfSInUrl = evolutions.chain.evolves_to[0].species.url.lastIndexOf('s');
        const lastIndexOfBarInUrl = evolutions.chain.evolves_to[0].species.url.lastIndexOf('/');
        
        let result: string = "";
        
        for(var i = lastIndexOfSInUrl+2; i<lastIndexOfBarInUrl;i++)
            result+=evolutions.chain.evolves_to[0].species.url[i];
        arr.push(result);
        console.log(result);

        const lastIndexOfSInUrl2 = evolutions.chain.evolves_to[0].evolves_to[0].species.url.lastIndexOf('s');
        const lastIndexOfBarInUrl2 = evolutions.chain.evolves_to[0].evolves_to[0].species.url.lastIndexOf('/');
        
        let result2: string = "";
        
        for(var i = lastIndexOfSInUrl2+2; i<lastIndexOfBarInUrl2;i++)
            result2+=evolutions.chain.evolves_to[0].evolves_to[0].species.url[i];
        arr.push(result2);

        setIds(arr);
        console.log(result2);
    }

    useEffect(() => {
        getEvolutionsById()
    }, [])
    
    return (
        <EvolutionContainer>
            { ids.map(_id=>(
                <Image key={_id} source={{ uri: `https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/00${_id}.png`}}/>
            )) }


        </EvolutionContainer>
    );
};