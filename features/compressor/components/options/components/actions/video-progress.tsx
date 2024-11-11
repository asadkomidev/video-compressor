import React from "react";
import { Loader } from "lucide-react";

import { Progress } from "@/components/ui/progress";
import { formatTimeHuman } from "@/lib/formats";

export const VideoProgress = ({
  progress,
  seconds,
}: {
  progress: number;
  seconds: number;
}) => (
  <div className="flex justify-between items-center gap-2 p-0.5 w-full">
    <div className="flex-1">
      <div className="flex justify-between text-sm mb-2">
        <div className="flex gap-2 items-center text-xs">
          {progress ? <p>Compressing</p> : <p>Loading</p>}{" "}
          <Loader className="animate-spin size-3" />
        </div>
        <p className="text-xs">{formatTimeHuman(seconds / 1000)}</p>
      </div>
      <Progress value={progress} />
    </div>
  </div>
);
