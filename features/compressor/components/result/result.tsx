import { FC } from "react";
import { ResultModal } from "./result-modal";
import { useResult } from "../../hooks/use-result";
import { Output } from "./output";
import { useVideoFile } from "../../hooks/use-video-file";
import { useTime } from "../../hooks/use-time";

export const Result: FC = () => {
  const { isOpen, setIsOpen } = useResult();
  const { videoFile } = useVideoFile();
  const { time } = useTime();

  return (
    <ResultModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Output timeTaken={time} videoFile={videoFile!} />
    </ResultModal>
  );
};
