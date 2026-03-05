/**
 * 广告 API 服务
 * 封装广告相关的 HTTP 请求
 */

import httpClient from './httpClient';
import { Ad } from '@repo/shared-types';

export interface AdListParams {
    page?: number;
    pageSize?: number;
    status?: string;
    category?: string;
    keyword?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

export interface ApiResult<T> {
    code: number;
    message: string;
    data: T;
}

export const adService = {
    /**
     * 获取广告列表
     */
    getAds: async (params?: AdListParams): Promise<PaginatedResponse<Ad>> => {
        const res = await httpClient.get<ApiResult<PaginatedResponse<Ad>>>('/ads', { params });
        return res.data.data;
    },

    /**
     * 获取广告详情
     */
    getAdById: async (id: string): Promise<Ad> => {
        const res = await httpClient.get<ApiResult<Ad>>(`/ads/${id}`);
        return res.data.data;
    },

    /**
     * 创建广告
     */
    createAd: async (data: Partial<Ad>): Promise<Ad> => {
        const res = await httpClient.post<ApiResult<Ad>>('/ads', data);
        return res.data.data;
    },

    /**
     * 更新广告
     */
    updateAd: async (id: string, data: Partial<Ad>): Promise<Ad> => {
        const res = await httpClient.put<ApiResult<Ad>>(`/ads/${id}`, data);
        return res.data.data;
    },

    /**
     * 删除广告
     */
    deleteAd: async (id: string): Promise<void> => {
        await httpClient.delete(`/ads/${id}`);
    },
    /**
     * 增加广告热度
     */
    incrementHeat: async (id: string): Promise<Ad> => {
        const res = await httpClient.put<ApiResult<Ad>>(`/ads/${id}/heat`);
        return res.data.data;
    },
};
