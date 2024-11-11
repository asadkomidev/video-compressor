import { FC } from "react";
import { VideoContainerFormat } from "@/types/video";
import { FormatProps } from "@/props";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OptionCard } from "../option-card";

export const Format: FC<FormatProps> = ({
  onSettingsChange,
  videoSettings,
  formatOptions,
}) => {
  return (
    <OptionCard title="Format">
      <Select
        onValueChange={(v: string) => {
          const format = v as VideoContainerFormat;
          onSettingsChange({
            ...videoSettings,
            format: format,
          });
        }}>
        <SelectTrigger className="w-full border-none px-0 shadow-none focus:ring-0">
          <SelectValue placeholder="Select a format" />
        </SelectTrigger>
        <SelectContent className="rounded-2xl">
          {formatOptions.map(({ label, value }) => (
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
