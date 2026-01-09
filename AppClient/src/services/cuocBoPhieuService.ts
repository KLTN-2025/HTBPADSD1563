import apiClient from '@/lib/api';
import { CuocBoPhieu } from '@/types';

export const cuocBoPhieuService = {
  getAll: async () => {
    const response = await apiClient.get<CuocBoPhieu[]>('/cuoc-bo-phieus', { params: { all: true } });
    return response.data;
  },
  // Helper to get all for stats/filtering (same as getAll for now)
  getAllForStats: async () => {
    const response = await apiClient.get<CuocBoPhieu[]>('/cuoc-bo-phieus', { params: { all: true } });
    return response.data;
  },
  getById: async (id: number) => {
    const response = await apiClient.get<CuocBoPhieu>(`/cuoc-bo-phieus/${id}`);
    return response.data;
  },
  create: async (data: Partial<CuocBoPhieu>) => {
    const response = await apiClient.post<CuocBoPhieu>('/cuoc-bo-phieus', data);
    return response.data;
  },
  update: async (id: number, data: Partial<CuocBoPhieu>) => {
    const response = await apiClient.put<CuocBoPhieu>(`/cuoc-bo-phieus/${id}`, data);
    return response.data;
  },
  delete: async (id: number) => {
    await apiClient.delete(`/cuoc-bo-phieus/${id}`);
  }
};
