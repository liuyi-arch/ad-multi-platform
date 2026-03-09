import { Ad, AdListParams, PaginatedResponse, ApiResult } from '@repo/shared-types';
import { normalizeAdAssets } from '@repo/utils';
import httpClient from './httpClient';

const getApiBaseUrl = () => String(httpClient.defaults.baseURL || '');

/**
 * 广告 API 服务
 * 封装广告相关的 HTTP 请求
 */
export const adService = {
    /**
     * 获取广告列表
     */
    getAds: async (params?: AdListParams): Promise<PaginatedResponse<Ad>> => {
        const res = await httpClient.get<ApiResult<PaginatedResponse<Ad>>>('/ads', { params });
        const data = res.data.data;
        const apiBaseUrl = getApiBaseUrl();
        return {
            ...data,
            items: data.items.map(ad => normalizeAdAssets(ad, apiBaseUrl)),
        };
    },

    /**
     * 获取广告详情
     */
    getAdById: async (id: string): Promise<Ad> => {
        const res = await httpClient.get<ApiResult<Ad>>(`/ads/${id}`);
        return normalizeAdAssets(res.data.data, getApiBaseUrl());
    },

    /**
     * 创建广告
     */
    createAd: async (data: Partial<Ad>): Promise<Ad> => {
        const res = await httpClient.post<ApiResult<Ad>>('/ads', data);
        return normalizeAdAssets(res.data.data, getApiBaseUrl());
    },

    /**
     * 更新广告
     */
    updateAd: async (id: string, data: Partial<Ad>): Promise<Ad> => {
        const res = await httpClient.put<ApiResult<Ad>>(`/ads/${id}`, data);
        return normalizeAdAssets(res.data.data, getApiBaseUrl());
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
        return normalizeAdAssets(res.data.data, getApiBaseUrl());
    },
};
