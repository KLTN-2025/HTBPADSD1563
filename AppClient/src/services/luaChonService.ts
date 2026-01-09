import apiClient from '@/lib/api';
import { LuaChon } from '@/types';

export const luaChonService = {
    getAll: async (cuocBoPhieuId?: number) => {
        const params = cuocBoPhieuId ? { cuoc_bo_phieu_id: cuocBoPhieuId } : {};
        const response = await apiClient.get<LuaChon[]>('/lua-chons', { params });
        return response.data;
    },
    getById: async (id: number) => {
        const response = await apiClient.get<LuaChon>(`/lua-chons/${id}`);
        return response.data;
    },
    create: async (data: Partial<LuaChon>) => {
        const response = await apiClient.post<LuaChon>('/lua-chons', data);
        return response.data;
    },
    update: async (id: number, data: Partial<LuaChon>) => {
        const response = await apiClient.put<LuaChon>(`/lua-chons/${id}`, data);
        return response.data;
    },
    delete: async (id: number) => {
        await apiClient.delete(`/lua-chons/${id}`);
    }
};
