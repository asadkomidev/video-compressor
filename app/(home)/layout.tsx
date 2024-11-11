import { Navbar } from "@/components/navigation/navbar/navbar";

import "../globals.css";
import { Container, Main } from "@/components/layouts/layout";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <Main>
        <Container className="pt-16">{children}</Container>
      </Main>
    </>
  );
}
