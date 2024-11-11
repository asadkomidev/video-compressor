import { VideoContainerFormat } from "@/types/video";
import { VideoQualityPreset } from "@/types/video";

export const qualityOptions: { label: string; value: VideoQualityPreset }[] = [
  { label: "Low", value: VideoQualityPreset.LOW },
  { label: "Medium", value: VideoQualityPreset.MEDIUM },
  { label: "High", value: VideoQualityPreset.HIGH },
];

export const formatOptions: { label: string; value: VideoContainerFormat }[] = [
  { label: "MP4", value: VideoContainerFormat.MP4 },
  { label: "WEBM", value: VideoContainerFormat.WEBM },
  { label: "MKV", value: VideoContainerFormat.MKV },
  { label: "AVI", value: VideoContainerFormat.AVI },
  { label: "MOV", value: VideoContainerFormat.MOV },
  { label: "FLV", value: VideoContainerFormat.FLV },
];
