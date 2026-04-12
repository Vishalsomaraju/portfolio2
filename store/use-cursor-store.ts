// ─────────────────────────────────────────────────────────────────────────────
// FILE: store/use-cursor-store.ts
// PURPOSE: Cursor state — "screwdriver" added for Stage 3 hardware interaction
// ─────────────────────────────────────────────────────────────────────────────

import { create } from "zustand";

export type CursorType =
  | "default"
  | "hover"
  | "project"
  | "cta"
  | "drag"
  | "text"
  | "screwdriver"; // added for /experience Stage 3

interface CursorState {
  type: CursorType;
  setType: (type: CursorType) => void;
  position: { x: number; y: number };
  setPosition: (x: number, y: number) => void;
}

export const useCursorStore = create<CursorState>((set) => ({
  type: "default",
  setType: (type) => set({ type }),
  position: { x: 0, y: 0 },
  setPosition: (x, y) => set({ position: { x, y } }),
}));
