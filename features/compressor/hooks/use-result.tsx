import { create } from "zustand";

interface ResultStore {
  isOpen: boolean;
  time?: number;
  setIsOpen: (isOpen: boolean, elapsedTime?: number) => void;
}

export const useResult = create<ResultStore>((set) => ({
  isOpen: false,
  time: undefined,
  setIsOpen: (isOpen, time) => set({ isOpen, time }),
}));
