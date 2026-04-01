import { create } from "zustand";

interface SiteStore {
  isLoaded: boolean;
  setLoaded: () => void;
}

export const useSiteStore = create<SiteStore>((set) => ({
  isLoaded: false,
  setLoaded: () => set({ isLoaded: true }),
}));
