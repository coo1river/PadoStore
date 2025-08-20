"use client";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import StyledComponentsRegistry from "@/styles/registry";
import GlobalStyle from "@/styles/globalStyle";
import ScrollToTop from "@/app/scrollToTop";
import Header from "./header";
import Footer from "./footer";

const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <StyledComponentsRegistry>
        <GlobalStyle />
        <ScrollToTop />
        <Header />
        {children}
        <Footer />
      </StyledComponentsRegistry>
    </QueryClientProvider>
  );
}
