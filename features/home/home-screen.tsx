"use client";

import { FC, Suspense } from "react";
import { Hero } from "./sections/hero/hero";
import { Features } from "./sections/features/features";
import { HowItWorks } from "./sections/how-it-works/how-it-works";
import { FAQSection } from "./sections/faq/faq-section";
import { CTA } from "./sections/cta/cta";

export const HomeScreen: FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Hero />
      <Features />
      <HowItWorks />
      <FAQSection />
      <CTA />
    </Suspense>
  );
};
