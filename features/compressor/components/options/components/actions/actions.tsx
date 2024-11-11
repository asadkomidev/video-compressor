import { FC, useEffect } from "react";
import { ActionsProps } from "@/props";
import { useStatus } from "@/features/compressor/hooks/use-status";
import { useResult } from "@/features/compressor/hooks/use-result";
import { useTime } from "@/features/compressor/hooks/use-time";
import { VideoProgress } from "./video-progress";
import { useOnClear } from "../../../video/hooks/use-on-clear";
import { DownloadButton } from "./download-button";
import { CompressButton } from "./compress-button";

export const Actions: FC<ActionsProps> = ({
  progress,
  time,
  videoFile,
  disableDuringCompression,
  compress,
}) => {
  const { status } = useStatus();
  const { setIsOpen } = useResult();
  const { setTime } = useTime();
  const { onClear } = useOnClear();

  useEffect(() => {
    setTime(time.elapsedTime!);
  }, [setTime, time]);

  return (
    <div className="flex flex-col gap-4 w-full mt-4">
      {status === "processing" ? (
        <div className="w-full ">
          <VideoProgress progress={progress} seconds={time.elapsedTime!} />
        </div>
      ) : (
        <div className="flex items-center justify-between w-full">
          <DownloadButton
            status={status}
            videoFile={videoFile}
            setIsOpen={setIsOpen}
          />
          <CompressButton
            status={status}
            disableDuringCompression={disableDuringCompression}
            compress={compress}
            onClear={onClear}
          />
        </div>
      )}
    </div>
  );
};
