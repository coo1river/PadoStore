import type { Metadata } from "next";
import { Providers } from "@/components/common/Providers";

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
        <Providers children={children} />
      </body>
    </html>
  );
}
