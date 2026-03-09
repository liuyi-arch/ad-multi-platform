import { Ad, ApiResult } from '@repo/shared-types';
import { normalizeAdAssets } from '@repo/utils';
import httpClient from './httpClient';

const getApiBaseUrl = () => String(httpClient.defaults.baseURL || '');

/**
 * 审批 API 服务
 * 封装审批相关的 HTTP 请求
 */
export const approvalService = {
    /**
     * 获取待审批列表
     */
    getPendingList: async (): Promise<Ad[]> => {
        const res = await httpClient.get<ApiResult<Ad[]>>('/approvals/pending');
        const apiBaseUrl = getApiBaseUrl();
        return res.data.data.map(ad => normalizeAdAssets(ad, apiBaseUrl));
    },

    /**
     * 审批通过
     */
    approveAd: async (id: string): Promise<Ad> => {
        const res = await httpClient.post<ApiResult<Ad>>(`/approvals/${id}/approve`);
        return normalizeAdAssets(res.data.data, getApiBaseUrl());
    },

    /**
     * 审批驳回
     */
    rejectAd: async (id: string, reason: string): Promise<Ad> => {
        const res = await httpClient.post<ApiResult<Ad>>(`/approvals/${id}/reject`, { reason });
        return normalizeAdAssets(res.data.data, getApiBaseUrl());
    },

    /**
     * 获取审批历史
     */
    getHistory: async (adId: string): Promise<any[]> => {
        const res = await httpClient.get<ApiResult<any[]>>(`/approvals/history/${adId}`);
        return res.data.data;
    },
};
