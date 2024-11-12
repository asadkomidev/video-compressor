"use client";

import { FC } from "react";

interface LinksProps {
  scrollToSection: (id: string) => void;
}

export const Links: FC<LinksProps> = ({ scrollToSection }) => {
  return (
    <div className="flex items-center gap-4">
      <ul className="flex items-center gap-4">
        <li
          className="text-sm font-medium cursor-pointer"
          onClick={() => scrollToSection("features")}>
          <span className="">Features</span>
        </li>
        <li
          className="text-sm font-medium cursor-pointer"
          onClick={() => scrollToSection("how-it-works")}>
          <span className="">How it works</span>
        </li>
        <li
          className="text-sm font-medium cursor-pointer"
          onClick={() => scrollToSection("faq")}>
          <span className="">FAQ</span>
        </li>
      </ul>
    </div>
  );
};
