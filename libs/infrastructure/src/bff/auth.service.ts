import axiosInstance from '../http/axios';
import { User } from '@temp-workspace/entities';

export const authService = {
  getCurrentUser: async (): Promise<User> => {
    const response = await axiosInstance.get('/auth/me');
    return response.data;
  },
  login: async (credentials: any): Promise<{ token: string; user: User }> => {
    const response = await axiosInstance.post('/auth/login', credentials);
    return response.data;
  },
};
