/**
 * 广告 API 服务
 * 封装广告相关的 HTTP 请求
 */

import httpClient from './httpClient';
import { Ad } from '@repo/shared-types';

const getAssetBaseUrl = () => {
    const baseUrl = String((httpClient.defaults as any)?.baseURL || '');
    return baseUrl.replace(/\/?api\/?$/, '');
};

const resolveAssetUrl = (url?: string) => {
    if (!url) return url;
    if (url.startsWith('http')) return url;
    const base = getAssetBaseUrl();
    if (!base) return url;
    const normalizedPath = url.startsWith('/') ? url : `/${url}`;
    return `${base}${normalizedPath}`;
};

const normalizeAdAssets = (ad: Ad): Ad => {
    return {
        ...ad,
        imageUrl: resolveAssetUrl(ad.imageUrl),
        thumbnail: resolveAssetUrl(ad.thumbnail),
        videoUrls: ad.videoUrls?.map((u) => resolveAssetUrl(u) || '')?.filter(Boolean),
    };
};

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
        const data = res.data.data;
        return {
            ...data,
            items: data.items.map(normalizeAdAssets),
        };
    },

    /**
     * 获取广告详情
     */
    getAdById: async (id: string): Promise<Ad> => {
        const res = await httpClient.get<ApiResult<Ad>>(`/ads/${id}`);
        return normalizeAdAssets(res.data.data);
    },

    /**
     * 创建广告
     */
    createAd: async (data: Partial<Ad>): Promise<Ad> => {
        const res = await httpClient.post<ApiResult<Ad>>('/ads', data);
        return normalizeAdAssets(res.data.data);
    },

    /**
     * 更新广告
     */
    updateAd: async (id: string, data: Partial<Ad>): Promise<Ad> => {
        const res = await httpClient.put<ApiResult<Ad>>(`/ads/${id}`, data);
        return normalizeAdAssets(res.data.data);
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
        return normalizeAdAssets(res.data.data);
    },
};
