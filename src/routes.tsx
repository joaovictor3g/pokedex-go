import React from 'react';
import { NavigationContainer, useRoute, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator, BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Login } from './pages/Login';
import { Home } from './pages/Home'
import { PokeList } from './pages/PokeList';
import { Favorites } from './pages/Favorites';
import { Profile } from './pages/Profile';
import { PokemonDetail } from './pages/PokemonDetail';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export function Routes(){
    return (
        <>
            <NavigationContainer>
                <Tab.Navigator 
                    screenOptions={{ 
                        tabBarVisible: false
                    }}>           
                    <Tab.Screen name="/" component={Login} />
                    <Tab.Screen name="/home" component={Home}/>
                    <Tab.Screen name="/pokelist" component={PokeList} />
                    <Tab.Screen name="/favorites" component={Favorites} />
                    <Tab.Screen name="/profile" component={Profile} />
                    <Tab.Screen name="/pokelist/detail" component={PokemonDetail} />
                    
                </Tab.Navigator>
            </NavigationContainer>

        </>
    );
}

export default Routes;