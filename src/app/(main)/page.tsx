"use client";

import { useEffect, useState } from "react";
import { Fair, getMainCategoryFairs, BannerInfo } from "@/api";
import { FairCard } from "@/components";
import Banner from "./_components/Banner";

export default function Home() {
  const [fairs, setFairs] = useState<Fair[]>([]);
  const [currentPage, setCurrentPage] = useState<string>("1");
  const [totalPages, setTotalPages] = useState<string>("1");
  const [banners, setBanners] = useState<BannerInfo[]>([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const params = {
          main: "서울",
          sub: "",
          type: "웨딩",
          page: "1",
          size: "3",
        };
        const data = await getMainCategoryFairs(params);
        const preBanners = data.fairs;

        if (preBanners && preBanners.length > 0) {
          // 랜덤 이미지 소스 생성
          const randomImageSources = Array.from(
            { length: 6 },
            (_, i) => `/images/Banner_${i + 1}.jpeg`
          ).sort(() => Math.random() - 0.5);

          // 페어 데이터의 첫 3개를 가져와서 이미지 소스만 랜덤으로 변경
          const bannerData: BannerInfo[] = preBanners
            .slice(0, 3)
            .map((fair, index) => ({
              ...fair,
              image_src: randomImageSources[index],
            }));

          setBanners(bannerData);
        }
      } catch (error) {
        console.error("Error fetching banner fairs:", error);
      }
    };

    fetchBanners();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const params = {
          main: "서울",
          sub: "",
          type: "웨딩",
          page: "1",
          size: "10",
        };
        const data = await getMainCategoryFairs(params);
        setFairs(data.fairs);
        setTotalPages(data.totalPages);
        setCurrentPage(data.currentPage);
      } catch (error) {
        console.error("Error fetching fairs:", error);
      }
    };
    fetchCities();
  }, [currentPage]);

  // 지역별로 데이터 필터링 (category1 기준으로 필터링)
  const regions = ["서울", "부산"];
  const filteredFairs = regions.map((region) =>
    fairs.filter((fair) => fair.category1 === region)
  );

  return (
    <div>
      {/* 배너 슬라이더 섹션 */}
      <Banner banners={banners} />

      {/* 지역별 웨딩 박람회 섹션 */}
      {filteredFairs.map((fairsInRegion, index) => (
        <section key={regions[index]} className="py-10">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b">
              {regions[index]} 웨딩 박람회
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {fairsInRegion.map((fair) => (
                <FairCard key={fair.id} fair={fair} />
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
