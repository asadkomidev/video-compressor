"use client";

import React from "react";
import { Slider } from "@/components/ui/slider";
import { TrimProps } from "@/props";
import { useTrim } from "../../hooks/use-trim";
import { OptionCard } from "../option-card";

export function Trim({
  videoSettings,
  onSettingsChange,
  disabled = false,
}: TrimProps) {
  const {
    formattedStartTime,
    formattedEndTime,
    handleSliderChange,
    duration,
    startTimeSeconds,
    endTimeSeconds,
  } = useTrim({ videoSettings, onSettingsChange });

  return (
    <OptionCard title="Trims">
      <div className="flex flex-col gap-4 mt-4">
        <Slider
          disabled={disabled}
          value={[startTimeSeconds, endTimeSeconds]}
          max={duration}
          step={1}
          className="w-full"
          onValueChange={handleSliderChange}
          aria-label="Video trim range"
        />
      </div>

      <div className="flex items-center justify-between mt-2">
        <p className="text-xs text-muted-foreground">{formattedStartTime}</p>
        <p className="text-xs text-muted-foreground">{formattedEndTime}</p>
      </div>
    </OptionCard>
  );
}

export default Trim as React.FC<TrimProps>;
