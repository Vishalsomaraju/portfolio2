// ─────────────────────────────────────────────────────────────────────────────
// FILE: store/use-experience-store.ts
// PURPOSE: Central state for the /experience page
// ─────────────────────────────────────────────────────────────────────────────

import { create } from "zustand";

export type ExperienceStage = 1 | 2 | 3 | 4 | 5;

interface ExperienceState {
  // Preloader
  isPreloaderComplete: boolean;
  setPreloaderComplete: (v: boolean) => void;

  // Current stage (1–5)
  currentStage: ExperienceStage;
  setStage: (s: ExperienceStage) => void;

  // Scroll progress across the full 500vh (0 to 1)
  scrollProgress: number;
  setScrollProgress: (v: number) => void;

  // Battery level derived from scrollProgress (0–100)
  // NOTE: never set independently — always derived via setScrollProgress
  batteryLevel: number;

  // Sound
  isSoundEnabled: boolean;
  toggleSound: () => void;

  // Cursor override: true = screwdriver, false = default cursor system
  screwdriverCursor: boolean;
  setScrewdriverCursor: (v: boolean) => void;
}

export const useExperienceStore = create<ExperienceState>((set) => ({
  isPreloaderComplete: false,
  setPreloaderComplete: (v) => set({ isPreloaderComplete: v }),

  currentStage: 1,
  setStage: (s) => set({ currentStage: s }),

  scrollProgress: 0,
  // Derive batteryLevel in the same atomic update — no double-render
  setScrollProgress: (v) =>
    set({ scrollProgress: v, batteryLevel: Math.round(v * 100) }),

  batteryLevel: 0,

  isSoundEnabled: true,
  toggleSound: () => set((s) => ({ isSoundEnabled: !s.isSoundEnabled })),

  screwdriverCursor: false,
  setScrewdriverCursor: (v) => set({ screwdriverCursor: v }),
}));
