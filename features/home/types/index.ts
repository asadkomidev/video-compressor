/**
 * @fileoverview Type definitions for the home page
 */

export interface FAQItem {
  /** Question */
  question: string;
  /** Answer */
  answer: string;
}

export interface FeatureCardProps {
  /** Icon */
  icon: React.ReactNode;
  /** Title */
  title: string;
  /** Description */
  description: string;
}

export interface StepCardProps extends FeatureCardProps {
  /** Step */
  step: string;
}
