"use client";

import Link from "next/link";
// import Image from "next/image";
import { Search, Menu } from "lucide-react";
import { useState } from "react";

const mainNavItems = [
  { title: "서울", href: "/seoul" },
  { title: "경기", href: "/gyeonggi" },
  { title: "인천", href: "/incheon" },
  { title: "부산", href: "/busan" },
  { title: "광주", href: "/gwangju" },
  { title: "전라", href: "/jeolla" },
  { title: "경상", href: "/gyeongsang" },
  { title: "제주", href: "/jeju" },
  { title: "기타", href: "/others" },
];

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 헤더 */}
      <header className="sticky top-0 z-40 w-full bg-white shadow">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* 로고 */}
            <Link href="/" className="flex-shrink-0">
              <h1 className="text-2xl md:text-3xl font-bold">THEWEDDING</h1>
            </Link>

            {/* 데스크탑 네비게이션 */}
            <nav className="hidden md:flex items-center space-x-6">
              {mainNavItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="text-sm text-gray-700 hover:text-black"
                >
                  {item.title}
                </Link>
              ))}
            </nav>

            {/* 검색 및 모바일 메뉴 버튼 */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 rounded-full hover:bg-gray-100"
                aria-label="검색"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 md:hidden rounded-full hover:bg-gray-100"
                aria-label="메뉴"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* 모바일 메뉴 */}
          {isMenuOpen && (
            <nav className="md:hidden py-4 px-4 space-y-2 bg-white border-t">
              {mainNavItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="block py-2 text-gray-700 hover:text-black"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          )}

          {/* 검색창 */}
          {isSearchOpen && (
            <div className="md:hidden border-t">
              <div className="container mx-auto px-4 py-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="디자이너 서울 웨딩박람회"
                    className="w-full py-2 pl-4 pr-10 border rounded-md"
                    onBlur={() => setIsSearchOpen(false)}
                  />
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    aria-label="검색하기"
                  >
                    <Search className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="border-b"></div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="flex-grow">{children}</main>

      {/* 푸터 */}
      <footer className="bg-gray-900 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2">마이 웨딩</h2>
            <p className="text-gray-400 text-sm">
              우리 결혼해요! 마이웨?
              <br />
              상담문의: 02-123-4567
            </p>
          </div>

          <div className="flex flex-wrap justify-between border-t border-gray-700 pt-6 text-xs text-gray-400">
            <div className="space-x-4">
              <Link href="/privacy" className="hover:text-white">
                개인정보처리방침
              </Link>
              <Link href="/terms" className="hover:text-white">
                이용약관
              </Link>
              <Link href="/location" className="hover:text-white">
                유의사항
              </Link>
            </div>
            <div>Copyright © 2025. My Wedding. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
