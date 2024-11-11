import { useCallback, useEffect, useState } from "react";
import { formatTimeDigital } from "@/lib/formats";
import { IVideoProcessingConfig } from "@/types/video";

interface UseTrimProps {
  videoSettings: IVideoProcessingConfig;
  onSettingsChange: (settings: IVideoProcessingConfig) => void;
}

export function useTrim({ videoSettings, onSettingsChange }: UseTrimProps) {
  const [duration, setDuration] = useState<number>(0);
  const { startTimeSeconds = 0, endTimeSeconds = 0 } = videoSettings;

  const formattedStartTime = formatTimeDigital(startTimeSeconds);
  const formattedEndTime = formatTimeDigital(endTimeSeconds);

  const handleMetadataLoaded = useCallback(
    (videoDuration: number) => {
      setDuration(videoDuration);
      onSettingsChange({
        ...videoSettings,
        endTimeSeconds: videoDuration,
      });
    },
    [onSettingsChange, videoSettings]
  );

  const handleSliderChange = useCallback(
    (values: number[]) => {
      const [newStartTime, newEndTime] = values;
      onSettingsChange({
        ...videoSettings,
        startTimeSeconds: newStartTime,
        endTimeSeconds: newEndTime,
      });
    },
    [onSettingsChange, videoSettings]
  );

  useEffect(() => {
    const videoElement = document.getElementById(
      "video-display"
    ) as HTMLVideoElement;

    if (!videoElement) {
      return;
    }

    const onLoadedMetadata = () => {
      handleMetadataLoaded(videoElement.duration);
    };

    videoElement.addEventListener("loadedmetadata", onLoadedMetadata);

    return () => {
      videoElement.removeEventListener("loadedmetadata", onLoadedMetadata);
    };
  }, [handleMetadataLoaded]);

  return {
    formattedStartTime,
    formattedEndTime,
    handleSliderChange,
    duration,
    startTimeSeconds,
    endTimeSeconds,
  };
}
