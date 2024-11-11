import { useState, useRef } from "react";

interface UseVideoDisplayProps {
  onLoad?: () => void;
  onError?: (error: Error) => void;
  playbackRate?: number;
}

export const useVideoDisplay = ({
  onLoad,
  onError,
  playbackRate = 1.0,
}: UseVideoDisplayProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleLoadStart = () => {
    setIsLoading(true);
    setError(null);
  };

  const handleLoadedData = () => {
    setIsLoading(false);
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate;
    }
    onLoad?.();
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const errorMessage = "Failed to load video";
    setError(errorMessage);
    setIsLoading(false);
    onError?.(new Error(errorMessage));
  };

  return {
    isLoading,
    error,
    videoRef,
    handleLoadStart,
    handleLoadedData,
    handleError,
  };
};
