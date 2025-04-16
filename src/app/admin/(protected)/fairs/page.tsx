"use client";

import { useState, useEffect } from "react";
import AddFairModal from "./AddFairModal";
import EditFairModal from "./EditFairModal";
import { FairFormData, AllSubCitiesResponse } from "@/api/types";
import {
  addFair,
  updateFair,
  getAllCategories,
  deleteFair,
} from "@/api/adminApi";

export default function FairsManagement() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingFair, setEditingFair] = useState<{
    id: string;
    data: FairFormData;
  } | null>(null);
  const [categories, setCategories] = useState<AllSubCitiesResponse>({});
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
        setCategoriesError(null);
      } catch (err) {
        setCategoriesError("카테고리 정보를 불러오는데 실패했습니다.");
        console.error("카테고리 로딩 오류:", err);
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleAddFair = async (fairData: FairFormData) => {
    try {
      await addFair(fairData);
      // 성공 시 페이지 새로고침
      window.location.reload();
    } catch (error) {
      console.error("박람회 등록 중 오류가 발생했습니다:", error);
      alert("박람회 등록에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleEditFair = async (fairData: FairFormData) => {
    if (!editingFair) return;

    try {
      await updateFair(editingFair.id, fairData);
      window.location.reload();
    } catch (error) {
      console.error("박람회 수정 중 오류가 발생했습니다:", error);
      alert("박람회 수정에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleDeleteFair = async (fairId: string) => {
    if (!confirm("정말로 이 박람회를 삭제하시겠습니까?")) {
      return;
    }

    try {
      await deleteFair(fairId);
      window.location.reload();
    } catch (error) {
      console.error("박람회 삭제 중 오류가 발생했습니다:", error);
      alert("박람회 삭제에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleEditClick = (fair: { id: string; data: FairFormData }) => {
    setEditingFair(fair);
    setIsEditModalOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">박람회 관리</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800"
        >
          새 박람회 등록
        </button>
      </div>

      {/* 필터 섹션 */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="박람회 검색"
            className="w-full px-4 py-2 border rounded-md"
          />
          <select className="w-full px-4 py-2 border rounded-md">
            <option value="">상태 선택</option>
            <option value="active">진행중</option>
            <option value="upcoming">예정</option>
            <option value="expired">종료</option>
          </select>
          <select className="w-full px-4 py-2 border rounded-md">
            <option value="">지역 선택</option>
            <option value="seoul">서울</option>
            <option value="gyeonggi">경기</option>
          </select>
        </div>
      </div>

      {/* 테이블 */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                박람회명
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                지역
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                기간
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                상태
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                관리
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  2024 서울 웨딩박람회
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">서울</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">
                  2024.03.01 ~ 2024.03.03
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  진행중
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <button
                  onClick={() =>
                    handleEditClick({
                      id: "1",
                      data: {
                        title: "2024 서울 웨딩박람회",
                        category1: "서울",
                        category2: "서울시",
                        start_date: "2024-03-01",
                        end_date: "2024-03-03",
                        redirect_url: "https://example.com",
                        address: "서울시 강남구",
                        description: "웨딩박람회 설명",
                        promotion: "프로모션 정보",
                        image_url: "https://example.com/image.jpg",
                        hash: "hash123",
                        type: "웨딩",
                      },
                    })
                  }
                  className="text-indigo-600 hover:text-indigo-900 mr-2"
                >
                  수정
                </button>
                <button
                  onClick={() => handleDeleteFair("1")}
                  className="text-red-600 hover:text-red-900"
                >
                  삭제
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <AddFairModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddFair}
        categories={categories}
        categoriesLoading={categoriesLoading}
        categoriesError={categoriesError}
      />

      {editingFair && (
        <EditFairModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingFair(null);
          }}
          onSubmit={handleEditFair}
          initialData={editingFair.data}
          categories={categories}
          categoriesLoading={categoriesLoading}
          categoriesError={categoriesError}
        />
      )}
    </div>
  );
}
