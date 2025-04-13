"use client";

export default function FairsManagement() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">박람회 관리</h1>
        <button className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800">
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
                <button className="text-indigo-600 hover:text-indigo-900 mr-2">
                  수정
                </button>
                <button className="text-red-600 hover:text-red-900">
                  삭제
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
