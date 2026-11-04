import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DefaultTheme, NavigationContainer, Theme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FavoritesScreen } from "../screens/FavoritesScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { OnboardingScreen } from "../screens/OnboardingScreen";
import { PokeListScreen } from "../screens/PokeListScreen";
import { PokemonDetailScreen } from "../screens/PokemonDetailScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { useTrainer } from "../state/TrainerContext";
import { colors, fonts } from "../theme";
import { RootStackParamList, TabParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

type IconName = React.ComponentProps<typeof MaterialCommunityIcons>["name"];

const tabIcons: Record<keyof TabParamList, [active: IconName, inactive: IconName]> = {
  Home: ["home-variant", "home-variant-outline"],
  PokeList: ["pokeball", "pokeball"],
  Favorites: ["heart", "heart-outline"],
  Profile: ["account", "account-outline"],
};

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: { fontFamily: fonts.medium, fontSize: 11 },
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border },
        tabBarIcon: ({ focused, color, size }) => (
          <MaterialCommunityIcons
            name={tabIcons[route.name][focused ? 0 : 1]}
            color={color}
            size={size}
          />
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: "Início" }} />
      <Tab.Screen name="PokeList" component={PokeListScreen} options={{ title: "Pokédex" }} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} options={{ title: "Favoritos" }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: "Perfil" }} />
    </Tab.Navigator>
  );
}

const navigationTheme: Theme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: colors.background, primary: colors.primary },
};

export function Navigation() {
  const { trainer } = useTrainer();

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {trainer ? (
          <>
            <Stack.Screen name="Tabs" component={Tabs} />
            <Stack.Screen name="PokemonDetail" component={PokemonDetailScreen} />
            <Stack.Screen
              name="EditTrainer"
              component={OnboardingScreen}
              options={{ presentation: "modal" }}
            />
          </>
        ) : (
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
