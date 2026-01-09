import apiClient from '@/lib/api';
import { CuTriDangKy } from '@/types';

export const cuTriService = {
    getAll: async (cuocBoPhieuId?: number, dinhDanhId?: number) => {
        const params: any = {};
        if (cuocBoPhieuId) params.cuoc_bo_phieu_id = cuocBoPhieuId;
        if (dinhDanhId) params.dinh_danh_id = dinhDanhId;

        const response = await apiClient.get<CuTriDangKy[]>('/cu-tri-dang-kys', { params });
        return response.data;
    },
    getById: async (id: number) => {
        const response = await apiClient.get<CuTriDangKy>(`/cu-tri-dang-kys/${id}`);
        return response.data;
    },
    create: async (data: Partial<CuTriDangKy>) => {
        const response = await apiClient.post<CuTriDangKy>('/cu-tri-dang-kys', data);
        return response.data;
    },
    update: async (id: number, data: Partial<CuTriDangKy>) => {
        const response = await apiClient.put<CuTriDangKy>(`/cu-tri-dang-kys/${id}`, data);
        return response.data;
    },
    delete: async (id: number) => {
        await apiClient.delete(`/cu-tri-dang-kys/${id}`);
    }
};
