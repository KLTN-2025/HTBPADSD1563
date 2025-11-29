import apiClient from '@/lib/api';
import { KetQuaTongHop } from '@/types';

export const ketQuaService = {
    getAll: async (cuocBoPhieuId?: number) => {
        const params = cuocBoPhieuId ? { cuoc_bo_phieu_id: cuocBoPhieuId } : {};
        const response = await apiClient.get<KetQuaTongHop[]>('/ket-qua-tong-hops', { params });
        return response.data;
    },
    getById: async (id: number) => {
        const response = await apiClient.get<KetQuaTongHop>(`/ket-qua-tong-hops/${id}`);
        return response.data;
    },
    // Usually results are not manually created, but API supports it
    create: async (data: Partial<KetQuaTongHop>) => {
        const response = await apiClient.post<KetQuaTongHop>('/ket-qua-tong-hops', data);
        return response.data;
    }
};
