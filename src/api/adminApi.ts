import apiClient from "./axios";
import { AdminFairsResponse } from "./types";

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
