import { Loader2 } from "lucide-react";
import { FC } from "react";

export const Loading: FC = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-100/30 rounded-lg">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        <span className="text-sm text-gray-500">Loading video...</span>
      </div>
    </div>
  );
};
