import { FC } from "react";
import { AudioProps } from "@/props";
import { Switch } from "@/components/ui/switch";
import { OptionCard } from "../option-card";

export const Audio: FC<AudioProps> = ({
  onChange,
  shouldRemoveAudio,
  videoSettings,
  disabled,
}) => {
  return (
    <OptionCard title="Audio">
      <div className="flex items-center justify-between mt-2">
        <p className="text-sm font-medium">Remove</p>
        <Switch
          checked={shouldRemoveAudio}
          onCheckedChange={(v: boolean) => {
            onChange({
              ...videoSettings,
              shouldRemoveAudio: v,
            });
          }}
          disabled={disabled}
        />
      </div>
    </OptionCard>
  );
};
