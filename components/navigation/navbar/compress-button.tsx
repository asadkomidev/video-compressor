"use client";

import { Button } from "@/components/ui/button";
import { useOpenCompressor } from "@/hooks/use-open-compressor";
import { FC } from "react";

export const CompressButton: FC = () => {
  const { setIsOpen } = useOpenCompressor();
  return (
    <div className="flex items-center gap-4">
      <Button onClick={() => setIsOpen(true)} className="rounded-full">
        Compress
      </Button>
    </div>
  );
};
