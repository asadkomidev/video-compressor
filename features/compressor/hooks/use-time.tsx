import { create } from "zustand";

type State = {
  time: number;
  setTime: (time: State["time"]) => void;
};

export const useTime = create<State>((set) => ({
  time: 0,
  setTime: (time) => set({ time }),
}));
