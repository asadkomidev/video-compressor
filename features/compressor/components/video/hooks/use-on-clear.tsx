import { useConfiguration } from "../../../hooks/use-configuration";
import { useStatus } from "../../../hooks/use-status";
import { useTime } from "../../../hooks/use-time";
import { useVideoFile } from "../../../hooks/use-video-file";
import { VideoQualityPreset, VideoContainerFormat } from "@/types/video";

export function useOnClear() {
  const { setStatus } = useStatus();
  const { setTime } = useTime();
  const { setVideoFile } = useVideoFile();
  const { setVideoSettings } = useConfiguration();

  const onClear = () => {
    setStatus("not-started");
    // @ts-expect-error - we know it's not null
    setVideoFile(null);
    setTime(0);
    setVideoSettings({
      quality: VideoQualityPreset.MEDIUM,
      format: VideoContainerFormat.MP4,
      endTimeSeconds: 0,
      startTimeSeconds: 0,
      shouldRemoveAudio: false,
      enableXCommand: false,
      enableWCommand: false,
    });
  };

  return { onClear };
}
