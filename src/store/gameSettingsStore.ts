import { create } from "zustand";

export type GameDifficulty = "guided" | "hardcore";

interface GameSettingsState {
  audioEnabled: boolean;
  volume: number;
  difficulty: GameDifficulty;
  highContrastMode: boolean;
  setAudioEnabled: (enabled: boolean) => void;
  toggleAudio: () => void;
  setVolume: (volume: number) => void;
  setDifficulty: (difficulty: GameDifficulty) => void;
  toggleHighContrast: () => void;
}

export const useGameSettingsStore = create<GameSettingsState>((set) => ({
  audioEnabled: true,
  volume: 0.7,
  difficulty: "guided",
  highContrastMode: false,
  setAudioEnabled: (enabled) => set({ audioEnabled: enabled }),
  toggleAudio: () => set((state) => ({ audioEnabled: !state.audioEnabled })),
  setVolume: (volume) => set({ volume }),
  setDifficulty: (difficulty) => set({ difficulty }),
  toggleHighContrast: () => set((state) => ({ highContrastMode: !state.highContrastMode })),
}));
