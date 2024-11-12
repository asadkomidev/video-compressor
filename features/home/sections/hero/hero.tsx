"use client";

import { Section } from "@/components/layouts/layout";
import { Button } from "@/components/ui/button";
import { useOpenCompressor } from "@/hooks/use-open-compressor";
import { ArrowRight } from "lucide-react";
import { FC } from "react";

export const Hero: FC = () => {
  const { setIsOpen } = useOpenCompressor();
  return (
    <Section className="py-32 ">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-3xl mx-auto">
          Compress videos without losing quality
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Fast, secure, and efficient video compression powered by FFmpeg
          technology. Reduce file size while maintaining quality.
        </p>
        <Button onClick={() => setIsOpen(true)} className=" rounded-full">
          Try it now
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </Section>
  );
};
