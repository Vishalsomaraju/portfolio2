import { create } from 'zustand';

interface ScrollStore {
  scrollY: number;
  progress: number;
  direction: 'up' | 'down';
  setScroll: (y: number, progress: number, direction: 'up' | 'down') => void;
}

export const useScrollStore = create<ScrollStore>((set) => ({
  scrollY: 0,
  progress: 0,
  direction: 'down',
  setScroll: (scrollY, progress, direction) => set({ scrollY, progress, direction }),
}));
