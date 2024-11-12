"use client";

import { Container, Header } from "@/components/layouts/layout";
import { FC, useState } from "react";
import { Logo } from "../logo/logo";

import { CompressButton } from "./compress-button";
import { Links } from "./links";
import { Menu } from "lucide-react";
import { X } from "lucide-react";

export const Navbar: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };
  return (
    <Header className="fixed top-0 left-0 right-0 backdrop-blur-lg bg-white/10 dark:bg-black/10">
      <Container>
        <nav className="flex items-center justify-between  h-16">
          <div className="flex items-center gap-4">
            <Logo />
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Links scrollToSection={scrollToSection} />
            <CompressButton />
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </Container>
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden pt-4 pb-2 border-b">
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => scrollToSection("features")}
              className="hover:text-primary transition-colors">
              Features
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="hover:text-primary transition-colors">
              How It Works
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="hover:text-primary transition-colors">
              FAQ
            </button>
          </div>
        </div>
      )}
    </Header>
  );
};
