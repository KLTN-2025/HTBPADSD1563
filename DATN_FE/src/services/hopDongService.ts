import apiClient from '@/lib/api';
import { HopDong } from '@/types';

export const hopDongService = {
    getAll: async () => {
        const response = await apiClient.get<HopDong[]>('/hop-dongs');
        return response.data;
    },
    getById: async (id: number) => {
        const response = await apiClient.get<HopDong>(`/hop-dongs/${id}`);
        return response.data;
    },
    create: async (data: Partial<HopDong>) => {
        const response = await apiClient.post<HopDong>('/hop-dongs', data);
        return response.data;
    },
    update: async (id: number, data: Partial<HopDong>) => {
        const response = await apiClient.put<HopDong>(`/hop-dongs/${id}`, data);
        return response.data;
    },
    delete: async (id: number) => {
        await apiClient.delete(`/hop-dongs/${id}`);
    }
};
