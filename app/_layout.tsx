import "../global.css";

import { useEffect } from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { FavoritesProvider } from "@/features/favorites/FavoritesProvider";
import { LevelUpModal } from "@/features/progress/LevelUpModal";
import { ProgressProvider } from "@/features/progress/ProgressProvider";
import { TrainerProvider, useTrainer } from "@/features/trainer/TrainerProvider";
import { palette, useThemeColors } from "@/theme/colors";

void SplashScreen.preventAutoHideAsync();

const WEEK = 1000 * 60 * 60 * 24 * 7;

// PokeAPI responses are kept on disk for a week, so the Pokédex works offline after one visit.
const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2, gcTime: WEEK } },
});
const persister = createAsyncStoragePersister({
  storage: AsyncStorage,
  key: "@pokedexgo:query-cache",
});

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PersistQueryClientProvider client={queryClient} persistOptions={{ persister, maxAge: WEEK }}>
        <TrainerProvider>
          <FavoritesProvider>
            <ProgressProvider>
              <RootNavigator />
              <LevelUpModal />
            </ProgressProvider>
          </FavoritesProvider>
        </TrainerProvider>
      </PersistQueryClientProvider>
    </GestureHandlerRootView>
  );
}

function RootNavigator() {
  const { trainer, isLoaded } = useTrainer();
  const scheme = useColorScheme();
  const colors = useThemeColors();
  const base = scheme === "dark" ? DarkTheme : DefaultTheme;
  const theme = {
    ...base,
    colors: {
      ...base.colors,
      primary: palette.brand,
      background: colors.canvas,
      card: colors.card,
    },
  };

  useEffect(() => {
    if (isLoaded) void SplashScreen.hideAsync();
  }, [isLoaded]);

  if (!isLoaded) return null;

  return (
    <ThemeProvider value={theme}>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={!!trainer}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="pokemon/[id]"
            options={{
              headerShown: true,
              headerTransparent: true,
              headerTitle: "",
              headerBackButtonDisplayMode: "minimal",
            }}
          />
          <Stack.Screen
            name="trainer"
            options={{
              presentation: "formSheet",
              sheetAllowedDetents: [0.55],
              sheetGrabberVisible: true,
              sheetCornerRadius: 32,
              // Transparent so iOS 26 renders the sheet as Liquid Glass.
              contentStyle: { backgroundColor: "transparent" },
            }}
          />
        </Stack.Protected>
        <Stack.Protected guard={!trainer}>
          <Stack.Screen name="onboarding" />
        </Stack.Protected>
      </Stack>
    </ThemeProvider>
  );
}
