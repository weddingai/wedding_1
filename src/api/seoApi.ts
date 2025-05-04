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

/**
 * 사이트맵(XML)을 string으로 받아오는 함수
 */
export const getSitemapXml = async (siteId: string): Promise<string> => {
  const response = await apiClient.get(`/seo/sitemap/${siteId}`, {
    responseType: "text",
    headers: { Accept: "application/xml" },
  });
  return response.data;
};
