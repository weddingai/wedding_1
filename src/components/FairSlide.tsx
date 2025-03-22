import { Fair } from "@/api";
import Image from "next/image";

interface FairSlideProps {
  fair: Fair;
}

export const FairSlide = ({ fair }: FairSlideProps) => {
  return (
    <div className="relative">
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
          <h2 className="text-2xl md:text-4xl font-bold">{fair.title}</h2>
          <p className="text-lg md:text-xl mt-2">
            {fair.start_date.split("T")[0]} ~ {fair.end_date.split("T")[0]}
          </p>
          <p className="text-sm md:text-lg">{fair.address}</p>
        </div>
      </div>
    </div>
  );
};
