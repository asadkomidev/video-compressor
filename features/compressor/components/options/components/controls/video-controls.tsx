"use client";

import { FC } from "react";

import { Audio } from "./audio";
import { Platforms } from "./platforms";
import { Quality } from "./quality";
import { Format } from "./format";
import { VideoControlsProps } from "@/props";
import { formatOptions } from "../../config";
import { qualityOptions } from "../../config";
import Trim from "./trim";

export const VideoControls: FC<VideoControlsProps> = ({
  videoSettings,
  onSettingsChange,
  disabled,
}) => {
  return (
    <div className="flex flex-col w-full h-full gap-2 ">
      <Trim
        videoSettings={videoSettings}
        onSettingsChange={onSettingsChange}
        disabled={disabled || false}
      />
      <Audio
        shouldRemoveAudio={videoSettings.shouldRemoveAudio}
        onChange={onSettingsChange}
        videoSettings={videoSettings}
        disabled={disabled || false}
      />
      <Platforms
        enableXCommand={videoSettings.enableXCommand}
        enableWCommand={videoSettings.enableWCommand}
        onSettingsChange={onSettingsChange}
        videoSettings={videoSettings}
        disabled={disabled || false}
      />
      {!videoSettings.enableXCommand && !videoSettings.enableWCommand && (
        <div className="flex flex-col gap-2">
          <Quality
            onSettingsChange={onSettingsChange}
            videoSettings={videoSettings}
            qualityOptions={qualityOptions}
          />
          <Format
            onSettingsChange={onSettingsChange}
            videoSettings={videoSettings}
            formatOptions={formatOptions}
          />
        </div>
      )}
    </div>
  );
};
