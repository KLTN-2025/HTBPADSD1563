import apiClient from '@/lib/api';
import type { PhieuBau, PaginatedResponse } from '@/types';

export const phieuBauService = {
  // Tạo phiếu bầu mới
  create: async (data: {
    cuoc_bo_phieu_id: number;
    nullifier: string;
    proof_cid: string;
    public_inputs_json?: Record<string, unknown>;
    tx_hash?: string;
    thoi_diem: string;
  }): Promise<PhieuBau> => {
    const response = await apiClient.post('/phieu-baus', data);
    return response.data;
  },

  // Lấy danh sách phiếu bầu
  getAll: async (page = 1): Promise<PaginatedResponse<PhieuBau>> => {
    const response = await apiClient.get(`/phieu-baus?page=${page}`);
    return response.data;
  },

  // Lấy chi tiết phiếu bầu
  getById: async (id: number): Promise<PhieuBau> => {
    const response = await apiClient.get(`/phieu-baus/${id}`);
    return response.data;
  },
};

