import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IVideoMetadata } from "@/types/video";
import { FC } from "react";

interface DownloadButtonProps {
  status: "completed" | "not-started";
  videoFile: IVideoMetadata;
  setIsOpen: (isOpen: boolean) => void;
}

export const DownloadButton: FC<DownloadButtonProps> = ({
  status,
  videoFile,
  setIsOpen,
}) => (
  <div className="w-full">
    <Button
      type="button"
      variant="outline"
      size="sm"
      className={cn(
        "rounded-full",
        status === "completed" && videoFile ? "block" : "hidden"
      )}
      onClick={() => setIsOpen(true)}>
      Download
    </Button>
  </div>
);
