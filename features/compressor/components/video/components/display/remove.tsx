import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { FC } from "react";

interface RemoveProps {
  onClear?: () => void;
}

export const Remove: FC<RemoveProps> = ({ onClear }) => {
  return (
    <Button
      size="icon"
      onClick={onClear}
      className="absolute top-2 right-2 z-10 size-6 bg-red-500 rounded-full">
      <X />
    </Button>
  );
};
