import { formatTimeHuman } from "@/lib/formats";
import { motion } from "framer-motion";
import { IVideoMetadata } from "@/types/video";
import { Button } from "@/components/ui/button";
import { formatBytes, calculateBlobSize, reduceSize } from "@/lib/formats";

export const Output = ({
  videoFile,
  timeTaken,
}: {
  videoFile: IVideoMetadata;
  timeTaken?: number;
}) => {
  const outputFileSize = calculateBlobSize(videoFile.blob);
  const { sizeReduced, percentage } = reduceSize(
    videoFile.file.size,
    videoFile.blob
  );

  const download = () => {
    if (!videoFile.url) return;
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = videoFile.url;
    a.download = videoFile.output || "";
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(videoFile.url);
    document.body.removeChild(a);
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      key={"output"}
      transition={{ type: "tween" }}
      className="py-3 h-fit  ">
      <div className="text-sm">
        <div className="flex justify-between items-center border-b mb-2 pb-2">
          <p className="font-semibold">New file size</p>
          <p className="font-semibold">{outputFileSize}</p>
        </div>
        <div className="flex justify-between items-center border-b mb-2 pb-2">
          <p className="font-semibold">Size Reduced </p>
          <p className="font-semibold">{percentage}%</p>
        </div>
        <div className="flex justify-between items-center border-b mb-2 pb-2">
          <p>Original file size</p>
          <p>{formatBytes(videoFile.file.size)}</p>
        </div>
        <div className="flex justify-between items-center border-b mb-2 pb-2">
          <p>Size Reduced</p>
          <p>{sizeReduced}</p>
        </div>
        <div className="flex justify-between items-center">
          <p>Time taken</p>
          <p>{timeTaken && formatTimeHuman(timeTaken / 1000)}</p>
        </div>

        <div className="flex justify-between items-center  mt-2 pt-2">
          <div className="flex items-center gap-1"></div>
          <Button
            type="button"
            size="sm"
            className="rounded-full"
            onClick={download}>
            Download
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
