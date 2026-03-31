import { create } from "zustand";

type CursorType = "default" | "hover" | "project" | "cta" | "drag" | "text";

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
  setPosition: (x, y) =>
    set({
      position: { x, y },
    }),
}));
