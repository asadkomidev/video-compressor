"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { Display } from "./display/display";
import { useVideoFile } from "../../../hooks/use-video-file";
import VideoDropzone from "./dropzone/video-dropzone";
import { useOnClear } from "../hooks/use-on-clear";

export const Compressor: FC = () => {
  const { videoFile, setVideoFile } = useVideoFile();
  const { onClear } = useOnClear();

  const handleDrop = (file: File) => {
    setVideoFile({
      file,
      name: file.name,
      size: file.size,
      source: "local",
      mimeType: file.type,
      hasError: false,
      duration: 0,
    });
  };

  return (
    <motion.div className="flex flex-col w-full h-full  items-center justify-center  rounded-lg">
      {videoFile ? (
        <Display
          videoUrl={URL.createObjectURL(videoFile.file)}
          onClear={onClear}
        />
      ) : (
        <VideoDropzone
          onDrop={(file) => handleDrop(file)}
          acceptedFileTypes={{
            "video/*": [".mp4", ".mov"],
          }}
          maxSize={50 * 1024 * 1024} // 50MB
          disabled={false}
          isLoading={false}
          errorMessages={{
            fileType: "Please upload a valid video or image file",
            fileSize: "File must be smaller than 50MB",
            generic: "Upload failed. Please try again",
          }}
          placeholder="Drop your media files here"
          className="custom-class"
        />
      )}
    </motion.div>
  );
};
