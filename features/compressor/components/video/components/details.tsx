import { FC } from "react";
import { formatBytes } from "@/lib/formats";
import { useVideoFile } from "../../../hooks/use-video-file";

export const Details: FC = () => {
  const { videoFile } = useVideoFile();

  return (
    <div className=" p-4 flex items-center justify-between">
      <div className="">
        <p className="text-sm font-medium">Video</p>
        <p className="text-xs max-w-64 lg:max-w-96 text-muted-foreground truncate pr-6">
          {videoFile?.name ?? "No video selected"}
        </p>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium">Size</p>
        <p className="text-xs text-muted-foreground whitespace-nowrap">
          {formatBytes(videoFile?.size ?? 0)}
        </p>
      </div>
    </div>
  );
};
