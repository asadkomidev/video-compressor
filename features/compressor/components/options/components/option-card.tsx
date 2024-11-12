import { FC } from "react";

interface OptionCardProps {
  children: React.ReactNode;
  title: string;
}

export const OptionCard: FC<OptionCardProps> = ({ children, title }) => {
  return (
    <div className="flex flex-col w-full h-full  rounded-2xl p-4 bg-background border">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <p className="text-xs text-muted-foreground font-medium">{title}</p>
        </div>
      </div>
      {children}
    </div>
  );
};
