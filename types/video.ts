/**
 * @fileoverview Type definitions for video processing operations
 */

/**
 * Represents metadata and content of a video file being processed
 * @interface IVideoMetadata
 */
export interface IVideoMetadata {
  /** Original file object */
  file: File;
  /** Display name of the video */
  name: string;
  /** Size of the video in bytes */
  size: number;
  /** Duration of the video in seconds */
  duration: number;
  /** Source/origin of the video */
  source: string;
  /** MIME type of the video */
  mimeType: string;
  /** Indicates if there was an error during processing */
  hasError?: boolean;
  /** URL to access the video (if available) */
  url?: string;
  /** Processing output data */
  processingOutput?: unknown;
  /** Binary large object representation */
  blobData?: Blob;
  /** Output data */
  output?: string;
  /** Blob data */
  blob?: Blob;
}

/**
 * Video quality presets for encoding
 * @enum {string}
 */
export enum VideoQualityPreset {
  /** Low quality - suitable for preview */
  LOW = "10",
  /** Medium quality - balanced option */
  MEDIUM = "20",
  /** High quality - best for final output */
  HIGH = "30",
}

/**
 * Supported video container formats
 * @enum {string}
 */
export enum VideoContainerFormat {
  /** MPEG-4 Part 14 */
  MP4 = "mp4",
  /** WebM format */
  WEBM = "webm",
  /** Ogg format */
  OGG = "ogg",
  /** QuickTime Movie */
  MOV = "mov",
  /** Matroska Video */
  MKV = "mkv",
  /** Audio Video Interleave */
  AVI = "avi",
  /** Flash Video */
  FLV = "flv",
  /** iTunes Video */
  M4V = "m4v",
}

/**
 * Configuration options for video processing
 * @interface IVideoProcessingConfig
 */
export interface IVideoProcessingConfig {
  /** Quality preset for encoding */
  quality: VideoQualityPreset;
  /** Target container format */
  format: VideoContainerFormat;
  /** End timestamp in seconds */
  endTimeSeconds: number;
  /** Start timestamp in seconds */
  startTimeSeconds: number;
  /** Flag to remove audio track */
  shouldRemoveAudio: boolean;
  /** Flag to enable X command */
  enableXCommand: boolean;
  /** Flag to enable W command */
  enableWCommand: boolean;
}
