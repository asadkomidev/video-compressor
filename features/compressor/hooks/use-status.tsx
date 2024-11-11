import { create } from "zustand";

interface StatusStore {
  status: "not-started" | "processing" | "completed";
  setStatus: (status: "not-started" | "processing" | "completed") => void;
}

export const useStatus = create<StatusStore>((set) => ({
  status: "not-started",
  setStatus: (status) => set({ status }),
}));
