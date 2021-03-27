import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Login } from './pages/Login';
import { Home } from './pages/Home'
import { PokeList } from './pages/PokeList';
import { Favorites } from './pages/Favorites';
import { Profile } from './pages/Profile';

const Tab = createBottomTabNavigator();

export function Routes(){
    return (
        <NavigationContainer>
            <Tab.Navigator 
                screenOptions={{ 
                    tabBarVisible: false
                }}>
                <Tab.Screen name="/" component={Login} />
                <Tab.Screen name="/home" component={Home} />
                <Tab.Screen name="/pokelist" component={PokeList} />
                <Tab.Screen name="/favorites" component={Favorites} />
                <Tab.Screen name="/profile" component={Profile} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default Routes;