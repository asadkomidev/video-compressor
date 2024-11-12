import { FC } from "react";
import { CTAContent } from "./cta-content";
import { Section } from "@/components/layouts/layout";

export const CTA: FC = () => {
  return (
    <Section className="py-32 ">
      <div className=" mx-auto">
        <CTAContent />
      </div>
    </Section>
  );
};
