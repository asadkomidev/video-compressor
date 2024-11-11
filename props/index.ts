/**
 * Props for the VideoDisplay component
 */

import { AcceptedFileTypes } from "@/types/types";
import {
  IVideoMetadata,
  IVideoProcessingConfig,
  VideoContainerFormat,
  VideoQualityPreset,
} from "@/types/video";

export interface VideoDisplayProps {
  /** URL of the video to display */
  videoUrl: string;
  /** Optional CSS class name */
  className?: string;
  /** Optional poster image URL */
  poster?: string;
  /** Optional autoplay flag */
  autoPlay?: boolean;
  /** Optional muted flag */
  muted?: boolean;
  /** Optional loop flag */
  loop?: boolean;
  /** Optional playback rate */
  playbackRate?: number;
  /** Optional callback for when video fails to load */
  onError?: (error: Error) => void;
  /** Optional callback for when video loads */
  onLoad?: () => void;
  /** Optional callback for when video is cleared */
  onClear?: () => void;
}

/**
 * Props for the CompressorDrawer component
 */
export interface CompressorDrawerProps {
  /** Title of the drawer */
  title?: string;
  /** Description of the drawer */
  description?: string;
  /** Open state of the drawer */
  open: boolean;
  /** Callback for when the drawer is opened or closed */
  onOpenChange: (open: boolean) => void;
  /** Children of the drawer */
  children?: React.ReactNode;
}

/**
 * Props for the Dropzone component
 */
export interface DropzoneProps {
  /** Callback function when file is dropped */
  onDrop: (file: File) => void;

  /** Accepted file types configuration */
  acceptedFileTypes: AcceptedFileTypes;
  /** Optional disabled state */
  disabled?: boolean;
  /** Optional maximum file size in bytes */
  maxSize?: number;
  /** Optional custom error messages */
  errorMessages?: {
    fileType?: string;
    fileSize?: string;
    generic?: string;
  };
  /** Optional custom placeholder text */
  placeholder?: string;
  /** Optional loading state */
  isLoading?: boolean;
  /** Optional custom class name */
  className?: string;
}

/**
 * Props for the Trim component
 */
export interface TrimProps {
  /** Video processing configuration */
  videoSettings: IVideoProcessingConfig;
  /** Callback when settings change */
  onSettingsChange: (settings: IVideoProcessingConfig) => void;
  /** Optional disabled state */
  disabled?: boolean;
}

/**
 * Props for the VideoControls component
 */
export interface VideoControlsProps {
  /** Video processing configuration */
  videoSettings: IVideoProcessingConfig;
  /** Callback when settings change */
  onSettingsChange: (settings: IVideoProcessingConfig) => void;
  /** Optional disabled state */
  disabled?: boolean;
}

/**
 * Props for the Audio component
 */
export interface AudioProps {
  /** Video processing configuration */
  videoSettings: IVideoProcessingConfig;
  /** Callback when settings change */
  onChange: (settings: IVideoProcessingConfig) => void;
  /** Optional disabled state */
  disabled?: boolean;
  /** Whether to remove audio */
  shouldRemoveAudio: boolean;
}

/**
 * Props for the Platforms component
 */
export interface PlatformsProps {
  /** Whether to enable X command */
  enableXCommand: boolean;
  /** Whether to enable W command */
  enableWCommand: boolean;
  /** Callback when settings change */
  onSettingsChange: (settings: IVideoProcessingConfig) => void;
  /** Video processing configuration */
  videoSettings: IVideoProcessingConfig;
  /** Optional disabled state */
  disabled: boolean;
}

/**
 * Props for the Quality component
 */
export interface QualityProps {
  /** Callback when settings change */
  onSettingsChange: (settings: IVideoProcessingConfig) => void;
  /** Video processing configuration */
  videoSettings: IVideoProcessingConfig;
  /** Quality options */
  qualityOptions: { label: string; value: VideoQualityPreset }[];
}

/**
 * Props for the Format component
 */
export interface FormatProps {
  /** Callback when settings change */
  onSettingsChange: (settings: IVideoProcessingConfig) => void;
  /** Video processing configuration */
  videoSettings: IVideoProcessingConfig;
  /** Format options */
  formatOptions: { label: string; value: VideoContainerFormat }[];
}

/**
 * Props for the Actions component
 */
export interface ActionsProps {
  /** Progress of the compression */
  progress: number;
  /** Time of the compression */
  time: {
    startTime?: Date;
    elapsedTime?: number;
  };
  /** Video file metadata */
  videoFile: IVideoMetadata;
  /** Whether to disable during compression */
  disableDuringCompression: boolean;
  /** Callback to compress the video */
  compress: () => void;
}
