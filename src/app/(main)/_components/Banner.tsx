import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { BannerInfo } from "@/api";
import { FairSlide, EmptySlide } from "@/components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/styles/slickStyle.css";

// 커스텀 화살표 컴포넌트 타입 정의
interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const PrevArrow = (props: ArrowProps) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <FiChevronLeft className="text-gray-800" />
    </div>
  );
};

const NextArrow = (props: ArrowProps) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <FiChevronRight className="text-gray-800" />
    </div>
  );
};

interface BannerProps {
  banners: BannerInfo[];
}

export default function Banner({ banners }: BannerProps) {
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
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    adaptiveHeight: true,
  };

  return (
    <section className="relative overflow-hidden">
      <Slider {...sliderSettings}>
        {banners.length > 0 ? (
          banners.map((banner) => <FairSlide key={banner.id} banner={banner} />)
        ) : (
          <EmptySlide />
        )}
      </Slider>
    </section>
  );
}
