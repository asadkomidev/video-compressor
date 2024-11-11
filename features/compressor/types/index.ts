/* eslint-disable @typescript-eslint/no-explicit-any */
export type VideoActions = {
  file: File;
  name: string;
  size: number;
  from: string;
  type: string;
  isError?: boolean;
  url?: string;
  output?: any;
  blob?: Blob;
};

export enum Quality {
  LOW = "10",
  MEDIUM = "20",
  HIGH = "30",
}

export enum VideoFormat {
  MP4 = "mp4",
  WEBM = "webm",
  OGG = "ogg",
  MOV = "mov",
  MKV = "mkv",
  AVI = "avi",
  FLV = "flv",
  M4V = "m4v",
}

export type VideoSettings = {
  quality: Quality;
  format: VideoFormat;
  customEndTime: number;
  customStartTime: number;
  removeAudio: boolean;
  xCommand: boolean;
  wCommand: boolean;
};
