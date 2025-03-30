// Fair 타입 정의
export interface Fair {
  id: string;
  title: string;
  category1: string;
  category2: string;
  region: string;
  start_date: string;
  end_date: string;
  redirect_url: string;
  address: string;
  description: string;
  promotion: string;
  created_at: string;
  updated_at: string;
  image_url: string;
  hash: string;
  type: string;
}

export interface BannerInfo extends Fair {
  image_src: string;
  title: string;
}

// API 응답 타입 정의
export interface FairsResponse {
  fairs: Fair[];
  totalPages: string;
  currentPage: string;
}

export interface City {
  id: number;
  name: string;
}

export type CityResponse = City[];

export interface SubCityResponse {
  sub_cities: City[];
}

export interface AllSubCitiesResponse {
  [key: number]: {
    id: number;
    name: string;
    sub_cities: City[];
  };
}

// 요청 파라미터 타입 정의
export interface FairsParams {
  main?: string;
  sub?: string;
  type?: string;
  page?: string;
  size?: string;
}

export interface AdminFairsResponse {
  active?: string;
  expired?: string;
}
