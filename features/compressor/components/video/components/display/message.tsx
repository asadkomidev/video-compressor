import { FC } from "react";

interface MessageProps {
  videoUrl: string;
}

export const Message: FC<MessageProps> = ({ videoUrl }) => {
  return (
    <p>
      Your browser doesn&apos;t support HTML video. Here is a
      <a href={videoUrl} download>
        link to the video
      </a>{" "}
      instead.
    </p>
  );
};
