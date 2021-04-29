import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Home } from '../pages/Home';
import { PokeList } from '../pages/PokeList';
import { Favorites } from '../pages/Favorites';
import { Profile } from '../pages/Profile';

const Drawer = createDrawerNavigator();

export default function HomeDrawer() {
  return (
      <Drawer.Navigator
        drawerPosition="right"
        backBehavior='none'
      >
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Pokemons" component={PokeList} />
        <Drawer.Screen name="Favoritos" component={Favorites} />
        <Drawer.Screen name="Perfil" component={Profile} />
      </Drawer.Navigator>

  );
}