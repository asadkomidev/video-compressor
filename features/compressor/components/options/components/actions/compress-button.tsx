import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FC } from "react";

interface CompressButtonProps {
  status: "not-started" | "completed";
  disableDuringCompression: boolean;
  compress: () => void;
  onClear: () => void;
}

export const CompressButton: FC<CompressButtonProps> = ({
  status,
  disableDuringCompression,
  compress,
  onClear,
}) => (
  <div className="w-full flex items-center justify-end">
    {status === "not-started" && (
      <Button
        size="sm"
        className={cn("rounded-full")}
        disabled={disableDuringCompression}
        onClick={compress}>
        Compress
      </Button>
    )}
    {status === "completed" && (
      <Button
        size="sm"
        className={cn("rounded-full")}
        disabled={disableDuringCompression}
        onClick={onClear}>
        New Compression
      </Button>
    )}
  </div>
);
