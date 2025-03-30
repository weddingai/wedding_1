"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { City, getMainCities, getAllSubCities } from "@/api";
import classNames from "classnames";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mainCities, setMainCities] = useState<City[]>([]);
  const [subCities, setSubCities] = useState<{ [key: number]: City[] }>({});
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // 메인 도시 가져오기
        const citiesData = await getMainCities();
        setMainCities(citiesData);

        // 한 번의 API 호출로 모든 서브 카테고리 데이터를 가져옵니다
        const allSubCitiesData = await getAllSubCities();

        // 메인 도시 배열 생성 (정렬을 위해)
        const mainCitiesArray: City[] = [];
        const subCitiesData: { [key: number]: City[] } = {};

        // 응답 데이터를 순회하며 필요한 형태로 변환
        for (const [cityIdStr, cityData] of Object.entries(allSubCitiesData)) {
          const cityId = parseInt(cityIdStr);

          // 메인 도시 배열에 추가
          mainCitiesArray.push({
            id: cityId,
            name: cityData.name,
          });

          // 서브 도시 데이터 설정
          subCitiesData[cityId] = cityData.sub_cities;
        }

        setMainCities(mainCitiesArray);
        setSubCities(subCitiesData);
      } catch (error) {
        console.error("데이터 가져오기 오류:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(subCities);
  }, [subCities]);

  const handleMouseEnter = (cityId: number) => {
    setActiveDropdown(cityId);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const handleCityClick = (cityId: number) => {
    // 모바일 메뉴가 열려있으면 닫기
    setIsMenuOpen(false);
    setActiveDropdown(null);

    // 약간의 지연을 두어 메뉴 닫힘 애니메이션이 완료되도록 함
    setTimeout(() => {
      const element = document.getElementById(`city-${cityId}`);
      if (element) {
        // 헤더 높이를 디바이스에 따라 조정
        const headerOffset = window.innerWidth < 768 ? 130 : 80;

        // 모바일에서는 window.pageYOffset 대신 window.scrollY 사용
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  const handleSubCityClick = (subCityId: number) => {
    // 서브 카테고리 클릭 시 필요한 처리 추가
    setActiveDropdown(null);
    // 여기에 서브 카테고리 페이지로 이동하는 로직을 추가할 수 있습니다
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 헤더 */}
      <header className="sticky top-0 z-40 w-full bg-white shadow">
        <div className="container mx-auto px-4">
          {/* 로고 섹션 */}
          <div className="flex items-center justify-start py-4">
            <Link href="/" className="flex-shrink-0">
              <h1 className="text-2xl md:text-3xl font-bold">THEWEDDING</h1>
            </Link>
          </div>

          {/* 메뉴 섹션 */}
          <div className="flex items-center justify-between h-12 border-b">
            {/* 데스크탑 네비게이션 */}
            <nav className="hidden md:flex h-full items-center space-x-6 relative">
              {mainCities.map((city) => (
                <div
                  key={city.id}
                  className="relative h-full"
                  onMouseEnter={() => handleMouseEnter(city.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    onClick={() => handleCityClick(city.id)}
                    className={classNames(
                      "h-full text-sm text-gray-700 hover:text-black",
                      activeDropdown === city.id && "border-b-4 border-black"
                    )}
                  >
                    {city.name}
                  </button>

                  {/* 드롭다운 메뉴 */}
                  {activeDropdown === city.id && (
                    <div className="absolute left-0 w-48 bg-white shadow-lg rounded-b-md py-2 z-10">
                      {isLoading ? (
                        <div className="px-4 py-2 text-sm text-gray-500">
                          로딩 중...
                        </div>
                      ) : subCities[city.id] &&
                        subCities[city.id].length > 0 ? (
                        subCities[city.id].map((subCity) => (
                          <button
                            key={subCity.id}
                            onClick={() => handleSubCityClick(subCity.id)}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            {subCity.name}
                          </button>
                        ))
                      ) : (
                        <div className="px-4 py-2 text-sm text-gray-500">
                          현재 지역에서 열리는 박람회가 없습니다
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* 검색 및 모바일 메뉴 버튼 */}
            <div className="flex items-center space-x-2">
              {/* <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 rounded-full hover:bg-gray-100"
                aria-label="검색"
              >
                <Search className="w-5 h-5" />
              </button> */}
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
              {mainCities.map((city) => (
                <div key={city.id}>
                  <button
                    onClick={() => handleCityClick(city.id)}
                    className="block w-full text-left py-2 text-gray-700 hover:text-black"
                  >
                    {city.name}
                  </button>
                </div>
              ))}
            </nav>
          )}
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="flex-grow">{children}</main>

      {/* 푸터 */}
      <footer className="bg-gray-900 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2">마이 웨딩</h2>
            <p className="text-gray-400 text-sm">우리 결혼해요! 마이웨딩</p>
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