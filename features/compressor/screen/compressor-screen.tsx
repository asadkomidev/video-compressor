"use client";

import { FC } from "react";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useOpenCompressor } from "@/hooks/use-open-compressor";

import { CompressorDrawer } from "./compress-drawer";
import { Video } from "../components/video/video";
import { Options } from "../components/options/options";

export const CompressorScreen: FC = () => {
  const { isOpen, close } = useOpenCompressor();
  return (
    <CompressorDrawer open={isOpen} onOpenChange={close}>
      <div className="lg:min-h-[65vh] min-h-[90vh] h-full lg:mb-4 px-4 lg:px-24">
        <ScrollArea className="lg:max-h-[65vh] max-h-[90vh] h-full overflow-y-scroll pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-4 ">
            <Video />
            <Options />
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </div>
    </CompressorDrawer>
  );
};
