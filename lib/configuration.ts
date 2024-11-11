/**
 * @fileoverview FFmpeg command configuration utilities for video processing
 */

import { getFileExtension } from "./conversion";
import { IVideoProcessingConfig, VideoContainerFormat } from "@/types/video";

/**
 * FFmpeg command configuration options
 */
interface FFmpegCommandOptions {
  input: string;
  output: string;
  videoCodec?: string;
  audioCodec?: string;
  videoBitrate?: string;
  audioBitrate?: string;
  preset?: string;
  crf?: string;
  extraOptions?: string[];
  trim?: {
    start: number;
    end: number;
  };
}

/**
 * Base FFmpeg command configuration
 */
const DEFAULT_CONFIG = {
  videoCodec: "libx264",
  audioCodec: "aac",
  preset: "medium",
  crf: "23",
  audioBitrate: "128k",
};

/**
 * Builds an FFmpeg command array from options
 */
function buildFFmpegCommand(options: FFmpegCommandOptions): string[] {
  const command = ["-i", options.input];

  if (options.videoCodec) {
    command.push("-c:v", options.videoCodec);
  }

  if (options.preset) {
    command.push("-preset", options.preset);
  }

  if (options.crf) {
    command.push("-crf", options.crf);
  }

  if (options.audioCodec) {
    command.push("-c:a", options.audioCodec);
  }

  if (options.audioBitrate) {
    command.push("-b:a", options.audioBitrate);
  }

  if (options.videoBitrate) {
    command.push(
      "-maxrate",
      options.videoBitrate,
      "-bufsize",
      options.videoBitrate
    );
  }

  if (options.trim) {
    command.push(
      "-ss",
      options.trim.start.toString(),
      "-to",
      options.trim.end.toString(),
      "-vf",
      `trim=start=${options.trim.start}:end=${options.trim.end}`
    );
  }

  if (options.extraOptions) {
    command.push(...options.extraOptions);
  }

  command.push(options.output);
  return command;
}

/**
 * WhatsApp video compression configuration
 */
export const whatsAppCompressionConfig = (
  input: string,
  output: string,
  videoSettings: IVideoProcessingConfig
): string[] => {
  return buildFFmpegCommand({
    input,
    output,
    videoCodec: "libx264",
    audioCodec: "aac",
    preset: "veryfast",
    crf: "35",
    audioBitrate: "64k",
    trim: {
      start: videoSettings.startTimeSeconds,
      end: videoSettings.endTimeSeconds,
    },
    extraOptions: [
      "-movflags",
      "faststart",
      "-maxrate",
      "1000k",
      "-bufsize",
      "1000k",
      "-fs",
      "9M",
    ],
  });
};

/**
 * X (Twitter) video compression configuration
 */
export const xCompressionConfig = (
  input: string,
  output: string,
  videoSettings: IVideoProcessingConfig
): string[] => {
  return buildFFmpegCommand({
    input,
    output,
    videoCodec: "libx264",
    audioCodec: "aac",
    audioBitrate: "192k",
    trim: {
      start: videoSettings.startTimeSeconds,
      end: videoSettings.endTimeSeconds,
    },
    extraOptions: [
      "-profile:v",
      "high",
      "-level:v",
      "4.2",
      "-pix_fmt",
      "yuv420p",
      "-r",
      "30",
      "-movflags",
      "faststart",
      "-maxrate",
      "5000k",
      "-bufsize",
      "5000k",
      "-tune",
      "film",
    ],
  });
};

/**
 * Instagram video compression configuration
 */
export const instagramCompressionConfig = (
  input: string,
  output: string,
  videoSettings: IVideoProcessingConfig
): string[] => {
  return buildFFmpegCommand({
    input,
    output,
    videoCodec: "libx264",
    audioCodec: "aac",
    preset: "veryslow",
    crf: "23",
    audioBitrate: "128k",
    trim: {
      start: videoSettings.startTimeSeconds,
      end: videoSettings.endTimeSeconds,
    },
    extraOptions: [
      "-vf",
      "crop=1080:1080:0:0",
      "-c:v",
      "libx264",
      "-c:a",
      "aac",
    ],
  });
};

/**
 * Format-specific configuration options
 */
const FORMAT_CONFIGS: Record<
  VideoContainerFormat,
  (input: string, output: string, settings: IVideoProcessingConfig) => string[]
> = {
  [VideoContainerFormat.MP4]: (input, output, settings) =>
    buildFFmpegCommand({
      input,
      output,
      videoCodec: "libx264",
      audioCodec: settings.shouldRemoveAudio ? undefined : "aac",
      audioBitrate: "192k",
      trim: {
        start: settings.startTimeSeconds,
        end: settings.endTimeSeconds,
      },
      extraOptions: [
        "-profile:v",
        "high",
        "-level:v",
        "4.2",
        "-pix_fmt",
        "yuv420p",
        "-r",
        "30",
        "-maxrate",
        "5000k",
        "-bufsize",
        "5000k",
        "-tune",
        "film",
        "-q:v",
        settings.quality.toString(),
        "-crf",
        "18",
        "-preset",
        "medium",
        "-f",
        settings.format,
        ...(settings.shouldRemoveAudio ? ["-an"] : ["-movflags", "faststart"]),
      ],
    }),

  [VideoContainerFormat.MOV]: createBasicFormatConfig,
  [VideoContainerFormat.AVI]: createBasicFormatConfig,
  [VideoContainerFormat.FLV]: createBasicFormatConfig,
  [VideoContainerFormat.MKV]: createBasicFormatConfig,
  [VideoContainerFormat.M4V]: createBasicFormatConfig,
  [VideoContainerFormat.WEBM]: createBasicFormatConfig,
  [VideoContainerFormat.OGG]: createBasicFormatConfig,
};

/**
 * Creates a basic format configuration
 */
function createBasicFormatConfig(
  input: string,
  output: string,
  settings: IVideoProcessingConfig
): string[] {
  return buildFFmpegCommand({
    input,
    output,
    videoCodec: "libx264",
    audioCodec: settings.shouldRemoveAudio ? undefined : "aac",
    trim: {
      start: settings.startTimeSeconds,
      end: settings.endTimeSeconds,
    },
    extraOptions: ["-crf", settings.quality],
  });
}

/**
 * Custom compression configuration based on input format and settings
 */
export const customCompressionConfig = (
  input: string,
  output: string,
  videoSettings: IVideoProcessingConfig
): string[] => {
  const extension = getFileExtension(input);

  if (extension === "mp4") {
    return buildFFmpegCommand({
      input,
      output,
      ...DEFAULT_CONFIG,
      trim: {
        start: videoSettings.startTimeSeconds,
        end: videoSettings.endTimeSeconds,
      },
    });
  }

  const formatConfig = FORMAT_CONFIGS[videoSettings.format];
  return formatConfig
    ? formatConfig(input, output, videoSettings)
    : ["-i", input, output];
};
