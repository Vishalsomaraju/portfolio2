import { create } from 'zustand';

type CursorState = 'default' | 'hover' | 'project' | 'cta';

interface CursorStore {
  state: CursorState;
  text: string | null;
  position: { x: number; y: number };
  setState: (state: CursorState, text?: string) => void;
  setPosition: (x: number, y: number) => void;
}

export const useCursorStore = create<CursorStore>((set) => ({
  state: 'default',
  text: null,
  position: { x: 0, y: 0 },
  setState: (state, text = null) => set({ state, text }),
  setPosition: (x, y) => set({ position: { x, y } }),
}));
