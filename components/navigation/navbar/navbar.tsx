import { Container, Header } from "@/components/layouts/layout";
import { FC } from "react";
import { Logo } from "../logo/logo";

import { CompressButton } from "./compress-button";

export const Navbar: FC = () => {
  return (
    <Header className="fixed top-0 left-0 right-0">
      <Container>
        <nav className="flex items-center justify-between backdrop-blur-lg bg-white/10 dark:bg-black/10 h-12">
          <div className="flex items-center gap-4">
            <Logo />
          </div>
          <div className="">links</div>

          <CompressButton />
        </nav>
      </Container>
    </Header>
  );
};
