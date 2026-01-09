import apiClient from '@/lib/api';
import { ToChucDonVi } from '@/types';

export const toChucService = {
    getAll: async () => {
        const response = await apiClient.get<ToChucDonVi[]>('/to-chuc-don-vis');
        return response.data;
    },
    getById: async (id: number) => {
        const response = await apiClient.get<ToChucDonVi>(`/to-chuc-don-vis/${id}`);
        return response.data;
    },
    create: async (data: Partial<ToChucDonVi>) => {
        const response = await apiClient.post<ToChucDonVi>('/to-chuc-don-vis', data);
        return response.data;
    },
    update: async (id: number, data: Partial<ToChucDonVi>) => {
        const response = await apiClient.put<ToChucDonVi>(`/to-chuc-don-vis/${id}`, data);
        return response.data;
    },
    delete: async (id: number) => {
        await apiClient.delete(`/to-chuc-don-vis/${id}`);
    }
};
