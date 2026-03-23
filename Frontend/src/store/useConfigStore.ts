import { create } from 'zustand';
import { type SchoolConfig } from '../db/db';

interface ConfigState {
  config: SchoolConfig | null;
  setConfig: (config: SchoolConfig) => void;
  clearConfig: () => void;
}

export const useConfigStore = create<ConfigState>()((set) => ({
  config: null,
  setConfig: (config) => set(() => ({ config })),
  clearConfig: () => set({ config: null }),
}));
