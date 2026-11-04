import React, { useEffect } from "react";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LevelUpModal } from "./src/components/LevelUpModal";
import { Navigation } from "./src/navigation";
import { FavoritesProvider } from "./src/state/FavoritesContext";
import { ProgressProvider } from "./src/state/ProgressContext";
import { TrainerProvider, useTrainer } from "./src/state/TrainerContext";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
});

function Root() {
  const { isLoaded } = useTrainer();
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });
  const isReady = isLoaded && fontsLoaded;

  useEffect(() => {
    if (isReady) SplashScreen.hideAsync();
  }, [isReady]);

  if (!isReady) return null;

  return (
    <>
      <Navigation />
      <LevelUpModal />
    </>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <TrainerProvider>
            <FavoritesProvider>
              <ProgressProvider>
                <StatusBar style="dark" />
                <Root />
              </ProgressProvider>
            </FavoritesProvider>
          </TrainerProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
