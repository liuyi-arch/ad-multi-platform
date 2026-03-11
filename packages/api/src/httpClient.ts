/**
 * HTTP 客户端
 * 基于 Axios 的统一请求封装
 */

import axios, { AxiosInstance, AxiosResponse } from 'axios';

const isDev = (import.meta as any).env.DEV;
const API_BASE_URL = (import.meta as any).env.VITE_API_URL ||
    (typeof window !== 'undefined'
        ? (window as any).__API_BASE_URL__ || (isDev ? 'http://localhost:3000/api' : '/api')
        : 'http://localhost:3000/api');

const httpClient: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 600000, // 增加到 10 分钟以支持大文件上传
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
