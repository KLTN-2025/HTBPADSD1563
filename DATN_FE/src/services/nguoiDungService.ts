import apiClient from '@/lib/api';
import { User } from '@/types';

export const nguoiDungService = {
    getAll: async () => {
        const response = await apiClient.get<User[]>('/nguoi-dungs');
        return response.data;
    },
    getById: async (id: number) => {
        const response = await apiClient.get<User>(`/nguoi-dungs/${id}`);
        return response.data;
    },
    create: async (data: Partial<User> & { mat_khau: string }) => {
        const response = await apiClient.post<User>('/nguoi-dungs', data);
        return response.data;
    },
    update: async (id: number, data: Partial<User>) => {
        const response = await apiClient.put<User>(`/nguoi-dungs/${id}`, data);
        return response.data;
    },
    delete: async (id: number) => {
        await apiClient.delete(`/nguoi-dungs/${id}`);
    }
};
