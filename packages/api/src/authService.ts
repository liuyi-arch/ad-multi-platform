import httpClient from './httpClient';

export interface AuthResponse {
    token: string;
    user: {
        id: string;
        username?: string;
        phone: string;
        role: string;
    };
}

export const authService = {
    /**
     * 用户登录
     */
    login: async (formData: any) => {
        const response = await httpClient.post<AuthResponse>('/users/login', formData);
        return response.data;
    },

    /**
     * 用户注册
     */
    register: async (formData: any) => {
        const response = await httpClient.post<AuthResponse>('/users/register', formData);
        return response.data;
    },

    /**
     * 获取当前用户信息
     */
    getMe: async () => {
        const response = await httpClient.get<AuthResponse['user']>('/users/me');
        return response.data;
    }
};

export default authService;
