import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { FAQItem } from "../../types";

interface FAQItemProps extends FAQItem {
  isActive: boolean;
  onClick: () => void;
}

export const FAQ: React.FC<FAQItemProps> = ({
  question,
  answer,
  isActive,
  onClick,
}) => {
  return (
    <motion.div layout className=" rounded-lg overflow-hidden border ">
      <motion.button
        className="w-full px-6 py-4 flex items-center justify-between text-left"
        onClick={onClick}>
        <span className="font-medium">{question}</span>
        <motion.div
          animate={{ rotate: isActive ? 180 : 0 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
          }}>
          <ChevronDown className="w-5 h-5 " />
        </motion.div>
      </motion.button>
      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: {
                height: {
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                },
                opacity: {
                  duration: 0.2,
                },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: {
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                },
                opacity: {
                  duration: 0.2,
                },
              },
            }}
            className="overflow-hidden">
            <div className="px-6 pb-4 text-muted-foreground">{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
