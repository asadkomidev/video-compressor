"use client";

import { Button } from "@/components/ui/button";
import { useOpenCompressor } from "@/hooks/use-open-compressor";
import { ArrowRight } from "lucide-react";
import { FC } from "react";

export const CTAContent: FC = () => {
  const { setIsOpen } = useOpenCompressor();
  return (
    <div className="text-center border rounded-2xl p-8 md:p-12">
      <h2 className="text-2xl lg:text-3xl font-bold mb-4">
        Ready to Compress Your Videos?
      </h2>
      <p className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
        Start compressing your videos today with our powerful FFmpeg technology.
      </p>
      <Button onClick={() => setIsOpen(true)} className=" rounded-full">
        Try it now
        <ArrowRight className="h-5 w-5" />
      </Button>
    </div>
  );
};
