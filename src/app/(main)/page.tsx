"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Fair, getMainFairs } from "@/api";

// const mockFairs: Fair[] = [
//   {
//     id: "123",
//     title: "서울 봄 웨딩 페어 2025",
//     category1: "서울",
//     category2: "서울시",
//     region: "1",
//     start_date: "2025-04-10T10:00:00Z",
//     end_date: "2025-04-12T18:00:00Z",
//     redirect_url: "www.naver.com",
//     address: "서울특별시 강남구 테헤란로 123 웨딩플라자",
//     description:
//       "2025년 최신 웨딩 트렌드와 다양한 웨딩 업체를 만나볼 수 있는 서울 최대 웨딩 박람회입니다.",
//     promotion: "사전 예약 시 웨딩 패키지 10% 할인 혜택!",
//     created_at: "2025-02-01T09:30:00Z",
//     updated_at: "2025-03-15T14:20:30Z",
//     image_url: "",
//     hash: "a1b2c3d4e5f6g7h8i9j0",
//     type: "웨딩",
//   },
// ];

export default function Home() {
  const [fairs, setFairs] = useState<Fair[]>([]);
  const [totalPages, setTotalPages] = useState<string>("0");
  const [currentPage, setCurrentPage] = useState<string>("1");

  // useEffect(() => {
  //   setFairs(mockFairs);
  // }, []);

  useEffect(() => {
    const fetchFairs = async () => {
      try {
        const data = await getMainFairs();
        setFairs(data.fairs);
        setTotalPages(data.totalPages);
        setCurrentPage(data.currentPage);
      } catch (error) {
        console.error("Error fetching fairs:", error);
      }
    };
    fetchFairs();
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
            fairs.map((fair) => (
              <div key={fair.id} className="relative">
                <div className="relative aspect-[16/5] md:aspect-[16/5] overflow-hidden">
                  <Image
                    src={fair.image_url}
                    alt={fair.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <h2 className="text-2xl md:text-4xl font-bold">
                      {fair.title}
                    </h2>
                    <p className="text-lg md:text-xl mt-2">
                      {fair.start_date.split("T")[0]} ~{" "}
                      {fair.end_date.split("T")[0]}
                    </p>
                    <p className="text-sm md:text-lg">{fair.address}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="relative aspect-[16/5] md:aspect-[16/5] overflow-hidden">
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">슬라이드가 없습니다.</span>
              </div>
            </div>
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
                <div key={fair.id} className="group">
                  <Link href={`/exhibition/${fair.id}`}>
                    <div className="mb-3 overflow-hidden rounded-lg">
                      <div className="relative aspect-[4/3]">
                        <Image
                          src={fair.image_url}
                          alt={fair.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 mb-1">
                      {fair.category1} &lt; {fair.category2}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{fair.title}</h3>
                    <div className="mb-2">
                      {fair.start_date.split("T")[0]} ~{" "}
                      {fair.end_date.split("T")[0]}
                    </div>
                    <p className="text-sm text-gray-700 mb-3">{fair.address}</p>
                    <div className="bg-amber-50 text-amber-800 text-sm px-4 py-2 rounded-md">
                      {fair.promotion || fair.description}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
