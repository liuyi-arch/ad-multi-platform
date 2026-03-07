import { Ad, ApiResult } from '@repo/shared-types';
import { normalizeAdAssets } from './utils';
import httpClient from './httpClient';

export const approvalService = {
    /**
     * 获取待审批列表
     */
    getPendingList: async (): Promise<Ad[]> => {
        const res = await httpClient.get<ApiResult<Ad[]>>('/approvals/pending');
        return res.data.data.map(normalizeAdAssets);
    },

    /**
     * 审批通过
     */
    approveAd: async (id: string): Promise<Ad> => {
        const res = await httpClient.post<ApiResult<Ad>>(`/approvals/${id}/approve`);
        return normalizeAdAssets(res.data.data);
    },

    /**
     * 审批驳回
     */
    rejectAd: async (id: string, reason: string): Promise<Ad> => {
        const res = await httpClient.post<ApiResult<Ad>>(`/approvals/${id}/reject`, { reason });
        return normalizeAdAssets(res.data.data);
    },

    /**
     * 获取审批历史
     */
    getHistory: async (adId: string): Promise<any[]> => {
        const res = await httpClient.get<ApiResult<any[]>>(`/approvals/history/${adId}`);
        return res.data.data;
    },
};
