import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// useState that is loaded from and saved to AsyncStorage under `key`.
export function usePersistentState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(key)
      .then((stored) => {
        if (stored !== null) setValue(JSON.parse(stored));
      })
      .catch((err) => console.warn(`Could not read ${key}`, err))
      .finally(() => setIsLoaded(true));
  }, [key]);

  useEffect(() => {
    if (!isLoaded) return;
    AsyncStorage.setItem(key, JSON.stringify(value)).catch((err) =>
      console.warn(`Could not save ${key}`, err),
    );
  }, [key, value, isLoaded]);

  return [value, setValue, isLoaded] as const;
}
