import Link from "next/link";
import {
  LayoutDashboard,
  Calendar,
  Users,
  Settings,
  LogOut,
} from "lucide-react";

// 관리자 메뉴 아이템
const adminMenuItems = [
  { title: "대시보드", href: "/admin", icon: LayoutDashboard },
  { title: "박람회 관리", href: "/admin/exhibitions", icon: Calendar },
  { title: "사용자 관리", href: "/admin/users", icon: Users },
  { title: "설정", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-screen">
        {/* 사이드바 */}
        <aside className="hidden md:flex w-64 flex-col bg-white border-r">
          <div className="p-4 border-b">
            <Link href="/admin" className="flex items-center">
              <h1 className="text-xl font-bold">THEWEDDING</h1>
              <span className="ml-2 text-xs bg-gray-100 px-2 py-1 rounded">
                Admin
              </span>
            </Link>
          </div>

          <nav className="flex-1 p-4">
            <ul className="space-y-1">
              {adminMenuItems.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 border-t">
            <button className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md w-full">
              <LogOut className="w-5 h-5 mr-3" />
              로그아웃
            </button>
          </div>
        </aside>

        {/* 모바일 헤더 */}
        <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b z-10">
          <div className="flex items-center justify-between p-4">
            <Link href="/admin" className="flex items-center">
              <h1 className="text-xl font-bold">THEWEDDING</h1>
              <span className="ml-2 text-xs bg-gray-100 px-2 py-1 rounded">
                Admin
              </span>
            </Link>
            <button className="p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        {/* 메인 콘텐츠 */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 md:pt-4">
          {/* 데스크톱 헤더 */}
          <div className="hidden md:flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">대시보드</h1>
            <div className="flex items-center">
              <span className="bg-gray-200 px-3 py-1 rounded-full text-sm mr-2">
                관리자
              </span>
              <span className="font-medium">홍길동</span>
            </div>
          </div>

          {/* 컨텐츠 영역 */}
          <div className="mt-6 md:mt-0">{children}</div>
        </main>
      </div>
    </div>
  );
}
