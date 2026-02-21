/**
 * HTTP 客户端
 * 基于 Axios 的统一请求封装
 */

import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ApiResponse } from '@repo/shared-types';

const API_BASE_URL = typeof window !== 'undefined'
    ? (window as any).__API_BASE_URL__ || 'http://localhost:3000/api'
    : 'http://localhost:3000/api';

const httpClient: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 请求拦截器
httpClient.interceptors.request.use(
    (config) => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('auth_token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 响应拦截器
httpClient.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error) => {
        const message = error.response?.data?.message || error.message || '请求失败';
        console.error('API Error:', message);
        return Promise.reject(error);
    }
);

export default httpClient;
