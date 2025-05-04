import apiClient from "./axios";
import {
  AdminFairsResponse,
  FairFormData,
  AllSubCitiesResponse,
  AdminFairsListParams,
  FairsResponse,
  SitesResponse,
  StructuredData,
} from "./types";

/**
 * 활성화된 박람회 수를 가져오는 함수
 */
export const getActiveFairsCount = async (): Promise<AdminFairsResponse> => {
  try {
    const response = await apiClient.get("/admin/fairs/active");
    return response.data;
  } catch (error) {
    console.error(
      "활성화된 박람회 수를 가져오는 중 오류가 발생했습니다:",
      error
    );
    throw error;
  }
};

/**
 * 만료된 박람회 수를 가져오는 함수
 */
export const getExpiredFairsCount = async (): Promise<AdminFairsResponse> => {
  try {
    const response = await apiClient.get("/admin/fairs/expired");
    return response.data;
  } catch (error) {
    console.error("만료된 박람회 수를 가져오는 중 오류가 발생했습니다:", error);
    throw error;
  }
};

/**
 * 새로운 박람회를 추가하는 함수
 */
export const addFair = async (fairData: FairFormData): Promise<void> => {
  try {
    await apiClient.post("/admin/fairs", fairData);
  } catch (error) {
    console.error("박람회 추가 중 오류가 발생했습니다:", error);
    throw error;
  }
};

/**
 * 모든 카테고리 정보를 가져오는 함수
 */
export const getAllCategories = async (): Promise<AllSubCitiesResponse> => {
  try {
    const response = await apiClient.get("/admin/categories");
    return response.data;
  } catch (error) {
    console.error("카테고리 정보를 가져오는 중 오류가 발생했습니다:", error);
    throw error;
  }
};

/**
 * 박람회 정보를 수정하는 함수
 */
export const updateFair = async (
  fairId: string,
  fairData: FairFormData
): Promise<void> => {
  try {
    await apiClient.put(`/admin/fairs/${fairId}`, fairData);
  } catch (error) {
    console.error("박람회 수정 중 오류가 발생했습니다:", error);
    throw error;
  }
};

export const deleteFair = async (
  fairId: string
): Promise<{ status: string; message: string }> => {
  try {
    const response = await apiClient.delete(`/admin/fairs/${fairId}`);
    return response.data;
  } catch (error) {
    console.error("박람회 삭제 중 오류가 발생했습니다:", error);
    throw error;
  }
};

/**
 * 관리자 박람회 목록을 가져오는 함수
 */
export const getAdminFairsList = async (
  params: AdminFairsListParams
): Promise<FairsResponse> => {
  try {
    const response = await apiClient.post("/admin/fairs/list", params);
    return response.data;
  } catch (error) {
    console.error(
      "관리자 박람회 목록을 가져오는 중 오류가 발생했습니다:",
      error
    );
    throw error;
  }
};

/**
 * 사이트 목록을 가져오는 함수
 */
export const getSitesList = async (): Promise<SitesResponse> => {
  try {
    const response = await apiClient.get("/admin/sites");
    return response.data;
  } catch (error) {
    console.error("사이트 목록을 가져오는 중 오류가 발생했습니다:", error);
    throw error;
  }
};

/**
 * 구조화 데이터 업데이트 함수
 */
export const updateStructuredData = async (
  siteId: string,
  structured_data: StructuredData
): Promise<void> => {
  try {
    await apiClient.put(`/admin/sites/${siteId}/structured-data`, {
      structured_data,
    });
  } catch (error) {
    console.error("구조화 데이터 업데이트 중 오류가 발생했습니다:", error);
    throw error;
  }
};

/**
 * 사이트맵 XML을 업데이트하는 함수
 */
export const updateSitemapXml = async (
  siteId: string,
  sitemap_xml: string
): Promise<void> => {
  try {
    await apiClient.put(`/admin/sites/${siteId}/sitemap`, { sitemap_xml });
  } catch (error) {
    console.error("사이트맵 XML 업데이트 중 오류가 발생했습니다:", error);
    throw error;
  }
};
