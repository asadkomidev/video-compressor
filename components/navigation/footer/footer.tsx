"use client";

import { Container } from "@/components/layouts/layout";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FC } from "react";
import { FaGithub, FaXTwitter } from "react-icons/fa6";
import ThemeToggle from "@/components/shared/theme-toggle";

type FooterProps = {
  className?: string;
};

export const Footer: FC<FooterProps> = ({ className }) => {
  return (
    <footer className={cn("", className)}>
      <Container>
        <div className=" mx-auto px-4 py-4 border-t">
          <div className="flex items-center justify-between">
            <div className="text-xs text-muted-foreground">
              Built with ❤️ by @asadkomi
            </div>
            <div className="text-xs text-muted-foreground flex items-center gap-2 ">
              <Link href="https://github.com/asadkomi">
                <FaGithub className="w-4 h-4" />
              </Link>
              <Link href="https://x.com/asadkomi">
                <FaXTwitter className="w-4 h-4" />
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};
