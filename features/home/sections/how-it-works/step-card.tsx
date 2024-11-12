import { FC } from "react";

import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepCardProps {
  icon: LucideIcon;
  step: number;
  title: string;
  description: string;
  index?: number;
}

export const StepCard: FC<StepCardProps> = ({
  icon: Icon,
  step,
  title,
  description,
  index,
}) => {
  return (
    <div className="p-6 rounded-2xl border ">
      <div className="flex items-center gap-4 mb-4">
        <div
          className={cn(
            "h-12 w-12 rounded-full flex items-center justify-center",
            index === 1 && "bg-red-500/20",
            index === 2 && "bg-cyan-500/20",
            index === 3 && "bg-purple-500/20"
          )}>
          <Icon
            className={cn(
              "size-6",
              index === 1 && "text-red-500",
              index === 2 && "text-cyan-500",
              index === 3 && "text-purple-500"
            )}
          />
        </div>
        <span
          className={cn(
            "text-4xl font-bold",
            index === 1 && "text-red-500/20",
            index === 2 && "text-cyan-500/20",
            index === 3 && "text-purple-500/20"
          )}>
          0{step}
        </span>
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};
