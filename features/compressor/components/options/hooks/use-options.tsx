import { useEffect, useRef } from "react";

import { useState } from "react";
import { toast } from "sonner";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";
import convertFile from "@/lib/conversion";
import { useVideoFile } from "../../../hooks/use-video-file";
import { useStatus } from "../../../hooks/use-status";
import { useResult } from "../../../hooks/use-result";
import { useConfiguration } from "../../../hooks/use-configuration";

export const useOptions = () => {
  const { videoFile, setVideoFile } = useVideoFile();
  const [progress, setProgress] = useState<number>(0);
  const [time, setTime] = useState<{
    startTime?: Date;
    elapsedTime?: number;
  }>({ elapsedTime: 0 });

  const { status, setStatus } = useStatus();

  const { setIsOpen } = useResult();

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (time?.startTime) {
      timer = setInterval(() => {
        const endTime = new Date();
        const timeDifference = endTime.getTime() - time.startTime!.getTime();
        setTime({ ...time, elapsedTime: timeDifference });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [time]);

  const ffmpegRef = useRef(new FFmpeg());
  const messageRef = useRef<HTMLParagraphElement | null>(null);

  const load = async () => {
    const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
    const ffmpeg = ffmpegRef.current;
    ffmpeg.on("log", ({ message }) => {
      if (messageRef.current) messageRef.current.innerHTML = message;
    });
    // toBlobURL is used to bypass CORS issue, urls with the same
    // domain can be used directly.
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        "application/wasm"
      ),
    });
  };

  useEffect(() => {
    load();
  }, []);

  const { videoSettings, setVideoSettings } = useConfiguration();

  const compress = async () => {
    if (!videoFile) return;
    try {
      setTime((oldTime) => ({ ...oldTime, startTime: new Date() }));
      setStatus("processing");
      ffmpegRef.current.on("progress", ({ progress: completion }) => {
        const percentage = completion * 100;
        setProgress(percentage);
      });
      ffmpegRef.current.on("log", () => {});

      const { url, output, outputBlob } = await convertFile(
        ffmpegRef.current,
        videoFile,
        videoSettings
      );
      setVideoFile({
        ...videoFile,
        url,
        output,
        blob: outputBlob,
      });
      setTime((oldTime) => ({ ...oldTime, startTime: undefined }));
      setStatus("completed");
      setIsOpen(true, time.elapsedTime!);
      setProgress(0);
    } catch (err) {
      console.log(err);
      setStatus("not-started");
      setProgress(0);
      setTime({ elapsedTime: 0, startTime: undefined });
      toast.error("Error condensing video");
    }
  };

  return {
    progress,
    time,
    compress,
    load,
    videoSettings,
    setVideoSettings,
    videoFile,
    status,
  };
};
