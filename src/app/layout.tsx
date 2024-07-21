import type { Metadata } from "next";
import GlobalStyle from "@/styles/globalStyle";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ScrollToTop from "./scrollToTop";
import StyledComponentsRegistry from "@/styles/registry";

export const metadata: Metadata = {
  title: "파도상점",
  description: "다양한 팬들을 위한 거래 플랫폼, 파도상점",
  icons: {
    icon: "/favicon.ico",
  },
  keywords: "파도상점",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <StyledComponentsRegistry>
          <GlobalStyle />
          <ScrollToTop />
          <Header />
          {children}
          <Footer />
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
