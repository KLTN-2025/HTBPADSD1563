import apiClient from '@/lib/api';
import { LoginCredentials, User } from '@/types';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<{ user: User; access_token: string }> => {
    // For API token authentication, we don't need CSRF cookie
    const response = await apiClient.post('/login', credentials);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post('/logout');
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get('/user');
    return response.data;
  },
};
