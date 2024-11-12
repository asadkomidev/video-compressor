import { SlidersHorizontal } from "lucide-react";
import { FC } from "react";

export const NoVideoSelected: FC = () => {
  return (
    <div className="flex-1 flex items-center justify-center rounded-2xl p-4 dark:bg-background border">
      <p className="text-sm text-muted-foreground text-center flex flex-col items-center">
        <SlidersHorizontal className="size-12 text-primary  mb-6" />
        No video selected <br /> Please select a video to compress.
      </p>
    </div>
  );
};
