import React from "react";
import { VideoDisplayProps } from "@/props";
import { useVideoDisplay } from "@/features/compressor/hooks/use-video-display";
import { Message } from "./message";
import { Loading } from "./loading";
import { Remove } from "./remove";
import { Error } from "./error";

export const Display: React.FC<VideoDisplayProps> = ({
  videoUrl,
  className = "",
  poster,
  autoPlay = false,
  muted = false,
  loop = false,
  playbackRate = 1,
  onError,
  onLoad,
  onClear,
}) => {
  const {
    isLoading,
    error,
    videoRef,
    handleLoadStart,
    handleLoadedData,
    handleError,
  } = useVideoDisplay({
    onLoad,
    onError,
    playbackRate,
  });

  return (
    <div className="relative w-full bg-background">
      {/* Video Element */}
      <video
        id="video-display"
        ref={videoRef}
        className={`w-full max-h-[450px] rounded-2xl ${
          isLoading ? "opacity-0" : "opacity-100"
        } transition-opacity duration-200 ${className}`}
        controls
        controlsList="nodownload"
        poster={poster}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline
        onLoadStart={handleLoadStart}
        onLoadedData={handleLoadedData}
        onError={handleError}
        aria-label="Video player">
        <source src={videoUrl} type="video/mp4" />
        <source src={videoUrl} type="video/webm" />
        <Message videoUrl={videoUrl} />
      </video>

      {/* Loading Spinner */}
      {isLoading && <Loading />}

      {/* Remove Button */}
      <Remove onClear={onClear} />

      {/* Error Message */}
      {error && <Error error={error} />}
    </div>
  );
};

export default Display;
