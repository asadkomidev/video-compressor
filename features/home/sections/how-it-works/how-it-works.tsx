import { Settings2, Upload } from "lucide-react";
import { Download } from "lucide-react";
import { FC } from "react";
import { StepCard } from "./step-card";
import { Section } from "@/components/layouts/layout";

export const HowItWorks: FC = () => {
  return (
    <Section className="py-32 " id="how-it-works">
      <div className=" mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <StepCard
            icon={Upload}
            step={1}
            title="Upload Video"
            description="Select and upload your video file to our secure server"
            index={1}
          />
          <StepCard
            icon={Settings2}
            step={2}
            title="Choose Settings"
            description="Select your preferred compression settings or use our smart defaults"
            index={2}
          />
          <StepCard
            icon={Download}
            step={3}
            title="Download"
            description="Get your compressed video file ready for use"
            index={3}
          />
        </div>
      </div>
    </Section>
  );
};
