import { Navbar } from "@/components/navigation/navbar/navbar";

import "../globals.css";
import { Container, Main } from "@/components/layouts/layout";
import { Footer } from "@/components/navigation/footer/footer";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <Main className="min-h-screen">
        <Container className="pt-16">{children}</Container>
      </Main>
      <Footer />
    </>
  );
}
