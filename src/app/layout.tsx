import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-kr",
});

export const metadata: Metadata = {
  title: "THE WEDDING - 웨딩 박람회",
  description: "다양한 웨딩 박람회 정보를 만나보세요",
  keywords: "웨딩 박람회, 결혼 박람회, 서울 웨딩, 부산 웨딩",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={notoSansKr.variable}>
      <body
        className={`min-h-screen bg-white text-gray-900 ${notoSansKr.className}`}
      >
        {children}
      </body>
    </html>
  );
}