import { Settings2 } from "lucide-react";
import { Shield } from "lucide-react";
import { FC } from "react";
import { FeatureCard } from "./feature-card";
import { Gauge } from "lucide-react";
import { Section } from "@/components/layouts/layout";

export const Features: FC = () => {
  return (
    <Section className="py-32 " id="features">
      <div className=" mx-auto ">
        <h2 className="text-3xl font-bold text-center mb-12">
          Powerful Features
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={Gauge}
            title="Fast Processing"
            description="Advanced algorithms ensure quick compression without compromising quality"
            index={1}
          />
          <FeatureCard
            icon={Shield}
            title="Secure Upload"
            description="Your files are encrypted and automatically deleted after processing"
            index={2}
          />
          <FeatureCard
            icon={Settings2}
            title="Custom Settings"
            description="Fine-tune compression parameters to match your specific needs"
            index={3}
          />
        </div>
      </div>
    </Section>
  );
};
