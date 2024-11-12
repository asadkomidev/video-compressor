"use client";

import { FC, useState } from "react";
import { FAQ } from "./faq";
import { Section } from "@/components/layouts/layout";

const faqData = [
  {
    question: "What video formats are supported?",
    answer:
      "We support most common video formats including MP4, AVI, MOV, WMV, and more.",
  },
  {
    question: "Is there a file size limit?",
    answer: "Yes, the maximum file size is 50MB for free users.",
  },
  {
    question: "How long does compression take?",
    answer:
      "Compression time depends on the file size and settings chosen. Most videos are processed within minutes.",
  },
  {
    question: "Will I lose video quality?",
    answer:
      "Our smart compression algorithms maintain optimal quality while reducing file size. You can also adjust settings for your specific needs.",
  },
];

export const FAQSection: FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <Section id="faq" className="py-32 ">
      <div className=" mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqData.map((item, index) => (
            <FAQ
              key={index}
              {...item}
              isActive={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </Section>
  );
};
