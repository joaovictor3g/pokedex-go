import React, { createContext, ReactNode, useContext } from "react";
import { usePersistentState } from "./usePersistentState";

export interface Trainer {
  name: string;
  gym: string;
}

interface TrainerContextValue {
  trainer: Trainer | null;
  isLoaded: boolean;
  saveTrainer: (trainer: Trainer) => void;
}

const TrainerContext = createContext<TrainerContextValue | null>(null);

export function TrainerProvider({ children }: { children: ReactNode }) {
  const [trainer, setTrainer, isLoaded] = usePersistentState<Trainer | null>(
    "@pokedexgo:trainer",
    null
  );

  return (
    <TrainerContext.Provider value={{ trainer, isLoaded, saveTrainer: setTrainer }}>
      {children}
    </TrainerContext.Provider>
  );
}

export function useTrainer() {
  const context = useContext(TrainerContext);
  if (!context) throw new Error("useTrainer must be used inside TrainerProvider");
  return context;
}
