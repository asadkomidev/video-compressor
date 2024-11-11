import {
  IVideoProcessingConfig,
  VideoContainerFormat,
  VideoQualityPreset,
} from "@/types/video";
import { create } from "zustand";

interface IConfigurationStore {
  videoSettings: IVideoProcessingConfig;
  setVideoSettings: (settings: IVideoProcessingConfig) => void;
}

export const useConfiguration = create<IConfigurationStore>((set) => ({
  videoSettings: {
    quality: VideoQualityPreset.MEDIUM,
    format: VideoContainerFormat.MP4,
    endTimeSeconds: 0,
    startTimeSeconds: 0,
    shouldRemoveAudio: false,
    enableXCommand: false,
    enableWCommand: false,
  },
  setVideoSettings: (settings) => set({ videoSettings: settings }),
}));
