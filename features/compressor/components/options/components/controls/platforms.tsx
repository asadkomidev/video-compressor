import { FC } from "react";
import { PlatformsProps } from "@/props";
import { Switch } from "@/components/ui/switch";
import { OptionCard } from "../option-card";

export const Platforms: FC<PlatformsProps> = ({
  enableXCommand,
  enableWCommand,
  onSettingsChange,
  videoSettings,
  disabled,
}) => {
  return (
    <OptionCard title="Platforms">
      <div className="flex items-center justify-between mt-2">
        <p className="text-sm font-medium">Twitter</p>
        <Switch
          checked={enableXCommand}
          onCheckedChange={(v: boolean) => {
            onSettingsChange({
              ...videoSettings,
              enableXCommand: v,
            });
          }}
          disabled={disabled}
        />
      </div>
      <div className="flex items-center justify-between mt-2">
        <p className="text-sm font-medium">WhatsApp</p>
        <Switch
          checked={enableWCommand}
          onCheckedChange={(v: boolean) => {
            onSettingsChange({
              ...videoSettings,
              enableWCommand: v,
            });
          }}
          disabled={disabled}
        />
      </div>
    </OptionCard>
  );
};
