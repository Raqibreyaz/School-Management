import { create } from "zustand";

interface SidebarTypes {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const useSidebar = create<SidebarTypes>((set) => ({
  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen:!state.sidebarOpen })),
}));
