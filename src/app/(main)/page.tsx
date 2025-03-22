"use client";

import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Fair, getMainCategoryFairs } from "@/api";
import { EmptySlide, FairCard, FairSlide } from "@/components";

export default function Home() {
  const [fairs, setFairs] = useState<Fair[]>([]);
  const [totalPages, setTotalPages] = useState<string>("0");
  const [currentPage, setCurrentPage] = useState<string>("1");

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

  // 슬라이더 설정
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    adaptiveHeight: true,
  };

  // 지역별로 데이터 필터링 (category1 기준으로 필터링)
  const regions = ["서울", "부산"];
  const filteredFairs = regions.map((region) =>
    fairs.filter((fair) => fair.category1 === region)
  );

  return (
    <div>
      {/* 배너 슬라이더 섹션 */}
      <section className="relative overflow-hidden">
        <Slider {...sliderSettings}>
          {fairs.length > 0 ? (
            fairs.map((fair) => <FairSlide key={fair.id} fair={fair} />)
          ) : (
            <EmptySlide />
          )}
        </Slider>
      </section>

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
