import { ApiResult, AuthResponse, AuthFormData } from '@repo/shared-types';
import httpClient from './httpClient';

export const authService = {
    /**
     * 用户登录
     */
    login: async (formData: AuthFormData): Promise<AuthResponse> => {
        const response = await httpClient.post<ApiResult<AuthResponse>>('/auth/login', formData);
        return response.data.data;
    },

    /**
     * 用户注册
     */
    register: async (formData: AuthFormData): Promise<AuthResponse> => {
        const response = await httpClient.post<ApiResult<AuthResponse>>('/auth/register', formData);
        return response.data.data;
    },

    /**
     * 获取当前用户信息
     */
    getMe: async (): Promise<AuthResponse['user']> => {
        const response = await httpClient.get<ApiResult<AuthResponse['user']>>('/auth/me');
        return response.data.data;
    }
};

export default authService;
