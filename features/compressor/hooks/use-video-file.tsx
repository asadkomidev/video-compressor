import { create } from "zustand";
import { IVideoMetadata } from "@/types/video";

interface VideoFileStore {
  videoFile: IVideoMetadata | null | undefined;
  setVideoFile: (videoFile: IVideoMetadata) => void;
}

export const useVideoFile = create<VideoFileStore>((set) => ({
  videoFile: null,
  setVideoFile: (videoFile) => set({ videoFile }),
}));
