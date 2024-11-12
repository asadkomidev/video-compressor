import { FC } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index?: number;
}

export const FeatureCard: FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  index,
}) => {
  return (
    <div className="p-4 rounded-2xl  border bg-background">
      <div
        className={cn(
          "size-8 rounded-full flex items-center justify-center mb-4 ",
          index === 1 && "bg-yellow-500/20 ",
          index === 2 && "bg-green-500/20 ",
          index === 3 && "bg-blue-500/20 "
        )}>
        <Icon
          className={cn(
            "size-5",
            index === 1 && "text-yellow-500",
            index === 2 && "text-green-500",
            index === 3 && "text-blue-500"
          )}
        />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};
