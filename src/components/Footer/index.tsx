import React from 'react';
import { Container, Resource, Resources, ResourceText } from './styles';
import { SimpleLineIcons, MaterialCommunityIcons, AntDesign, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface Footer {
   currentPage: string; 
}

export function Footer({ currentPage }: Footer) {
    const { navigate } = useNavigation();


    function handleNavigateToHome() {
        navigate('/home')
    }

    function handleNavigateToPokeList() {
        navigate('/pokelist')
    }


    function handleNavigateToFavorites() {
        navigate('/favorites')
    }


    function handleNavigateToProfile() {
        navigate('/profile')
    }

    return(
        <Container>
            <Resources>
                <Resource 
                    isResourceEqualToPage={currentPage==="home"} 
                    color="#48A9E0"
                    onPress={handleNavigateToHome}    
                >
                    <SimpleLineIcons name="home" size={26} color={currentPage ==="home" ? "#fff" : "#6666"} />
                    { currentPage==="home" && <ResourceText>Home</ResourceText> }
                </Resource>

                <Resource 
                    isResourceEqualToPage={currentPage==="pokelist"} 
                    color="#48A9E0"
                    onPress={handleNavigateToPokeList}
                >
                    <MaterialCommunityIcons name="pokeball" size={30} color={currentPage ==="pokelist" ? "#fff" : "#6666"} />
                    { currentPage==="pokelist" && <ResourceText>PokéList</ResourceText> }
                </Resource>

                <Resource 
                    isResourceEqualToPage={currentPage==="favorites"} 
                    color="#48A9E0"
                    onPress={handleNavigateToFavorites}
                >
                    <AntDesign name="hearto" size={30} color={currentPage ==="favorites" ? "#fff" : "#6666"} />
                    { currentPage==="favorites" && <ResourceText>Favoritos</ResourceText> }
                </Resource>

                <Resource 
                    isResourceEqualToPage={currentPage==="profile"} 
                    color="#48A9E0"
                    onPress={handleNavigateToProfile}
                >
                    <Ionicons name="person-outline" size={30} color={currentPage ==="profile" ? "#fff" : "#6666"} />
                    { currentPage==="profile" && <ResourceText>Perfil</ResourceText> }
                </Resource>
            </Resources>
        </Container>
    );
}