import apiClient from "./axios";
import { SeoResponse } from "./types";

/**
 * 구조화 데이터를 가져오는 함수
 */
export const getStructuredData = async (
  siteId: string
): Promise<SeoResponse> => {
  try {
    const response = await apiClient.get(`/seo/structured-data/${siteId}`);
    return response.data;
  } catch (error) {
    console.error("구조화 데이터를 가져오는 중 오류가 발생했습니다:", error);
    throw error;
  }
};
