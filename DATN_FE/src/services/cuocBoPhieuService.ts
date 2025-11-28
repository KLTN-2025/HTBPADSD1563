import apiClient from '@/lib/api';
import type { CuocBoPhieu, PaginatedResponse } from '@/types';

export const cuocBoPhieuService = {
  // Lấy danh sách cuộc bỏ phiếu
  getAll: async (page = 1): Promise<PaginatedResponse<CuocBoPhieu>> => {
    const response = await apiClient.get(`/cuoc-bo-phieus?page=${page}`);
    return response.data;
  },

  // Lấy chi tiết cuộc bỏ phiếu
  getById: async (id: number): Promise<CuocBoPhieu> => {
    const response = await apiClient.get(`/cuoc-bo-phieus/${id}`);
    return response.data;
  },

  // Lấy các cuộc bỏ phiếu đang diễn ra
  getDangDienRa: async (): Promise<CuocBoPhieu[]> => {
    const response = await apiClient.get('/cuoc-bo-phieus?trang_thai=dang_dien_ra');
    return response.data.data || [];
  },

  // Lấy các cuộc bỏ phiếu sắp diễn ra
  getSapDienRa: async (): Promise<CuocBoPhieu[]> => {
    const response = await apiClient.get('/cuoc-bo-phieus?trang_thai=len_ke_hoach');
    return response.data.data || [];
  },

  // Lấy các cuộc bỏ phiếu đã hoàn thành
  getHoanThanh: async (limit = 3): Promise<CuocBoPhieu[]> => {
    const response = await apiClient.get(`/cuoc-bo-phieus?trang_thai=hoan_thanh&per_page=${limit}`);
    return response.data.data || [];
  },

  // Lấy tất cả để tính thống kê
  getAllForStats: async (): Promise<CuocBoPhieu[]> => {
    const response = await apiClient.get('/cuoc-bo-phieus?per_page=1000');
    return response.data.data || [];
  },
};

