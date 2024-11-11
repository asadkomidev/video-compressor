"use client";

import { FC } from "react";

import { VideoControls } from "./components/controls/video-controls";
import { Actions } from "./components/actions/actions";
import { NoVideoSelected } from "./components/no-video-selected";
import { useOptions } from "./hooks/use-options";

export const Options: FC = () => {
  const {
    progress,
    time,
    compress,
    videoSettings,
    setVideoSettings,
    videoFile,
    status,
  } = useOptions();

  if (!videoFile) {
    return (
      <div className="col-span-1 h-full mt-4 lg:mt-0">
        <div className="justify-between flex flex-col h-full">
          <NoVideoSelected />
        </div>
      </div>
    );
  }

  const isProcessing = status === "processing";

  return (
    <div className="col-span-1 h-full mt-4 lg:mt-0">
      <div className="justify-between flex flex-col h-full">
        <div>
          <div className="flex flex-col">
            <VideoControls
              videoSettings={videoSettings}
              onSettingsChange={setVideoSettings}
              disabled={isProcessing}
            />
          </div>
        </div>
        <div className="flex-1 h-full" />
        <div className="h-full flex items-end">
          <Actions
            progress={progress}
            time={time}
            videoFile={videoFile}
            disableDuringCompression={isProcessing}
            compress={compress}
          />
        </div>
      </div>
    </div>
  );
};
