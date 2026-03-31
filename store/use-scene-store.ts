import { create } from 'zustand';

type ScenePhase = 'chaos' | 'gathering' | 'system' | 'projects' | 'end';

interface SceneStore {
  currentPhase: ScenePhase;
  transitionProgress: number;
  setPhase: (phase: ScenePhase) => void;
  setProgress: (progress: number) => void;
}

export const useSceneStore = create<SceneStore>((set) => ({
  currentPhase: 'chaos',
  transitionProgress: 0,
  setPhase: (currentPhase) => set({ currentPhase }),
  setProgress: (transitionProgress) => set({ transitionProgress }),
}));
