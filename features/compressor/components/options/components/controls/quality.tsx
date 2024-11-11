import { FC } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { QualityProps } from "@/props";
import { VideoQualityPreset } from "@/types/video";
import { OptionCard } from "../option-card";

export const Quality: FC<QualityProps> = ({
  onSettingsChange,
  videoSettings,
  qualityOptions,
}) => {
  return (
    <OptionCard title="Quality">
      <Select
        onValueChange={(v: string) => {
          const quality = v as VideoQualityPreset;
          onSettingsChange({
            ...videoSettings,
            quality: quality,
          });
        }}>
        <SelectTrigger className="w-full border-none px-0 shadow-none focus:ring-0">
          <SelectValue placeholder="Select a quality" />
        </SelectTrigger>
        <SelectContent className="rounded-2xl">
          {qualityOptions.map(({ label, value }) => (
            <SelectItem
              key={value}
              value={value.toString()}
              className="rounded-xl">
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </OptionCard>
  );
};
