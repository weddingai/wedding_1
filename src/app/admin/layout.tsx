"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Calendar, Search, LogOut } from "lucide-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// 관리자 메뉴 아이템
const adminMenuItems = [
  { title: "대시보드", href: "/admin/dashboard", icon: <LayoutDashboard /> },
  { title: "SEO 관리", href: "/admin/seo", icon: <Search /> },
  { title: "박람회 관리", href: "/admin/fairs", icon: <Calendar /> },
];

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      // 루트 페이지에서는 인증 체크를 하지 않음
      if (pathname === "/admin") {
        setIsLoading(false);
        return;
      }

      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error || !session) {
          router.push("/admin");
          return;
        }

        // 로그인된 상태에서 루트 페이지 접근 시 대시보드로 리다이렉트
        if (pathname === "/admin" && session) {
          router.push("/admin/dashboard");
          return;
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router, supabase.auth, pathname]);

  const isActive = (path: string) => {
    return pathname === path;
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push("/admin");
      router.refresh();
    } catch (error) {
      console.error("로그아웃 중 오류가 발생했습니다:", error);
    }
  };

  // 로딩 중 상태 표시
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // 루트 페이지일 경우 레이아웃을 적용하지 않음
  if (pathname === "/admin") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 헤더 */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/admin/dashboard" className="flex-shrink-0">
              <h1 className="text-xl font-bold">THEWEDDING</h1>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* 사이드바 */}
          <aside className="w-64 bg-white rounded-lg shadow p-4">
            <nav className="flex flex-col h-full">
              <div className="flex-1 space-y-1">
                {adminMenuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block px-4 py-2 rounded-md ${
                      isActive(item.href)
                        ? "bg-gray-900 text-white"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {item.icon}
                      {item.title}
                    </span>
                  </Link>
                ))}
              </div>
              <div className="pt-4 mt-4 border-t">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  <LogOut className="w-5 h-5" />
                  <span>로그아웃</span>
                </button>
              </div>
            </nav>
          </aside>

          {/* 메인 콘텐츠 */}
          <main className="flex-1 bg-white rounded-lg shadow p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
