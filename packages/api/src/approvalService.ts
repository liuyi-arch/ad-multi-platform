/**
 * 审批 API 服务
 * 封装审批相关的 HTTP 请求
 */

import httpClient from './httpClient';
import { Ad } from '@repo/shared-types';

interface ApiResult<T> {
    code: number;
    message: string;
    data: T;
}

export const approvalService = {
    /**
     * 获取待审批列表
     */
    getPendingList: async (): Promise<Ad[]> => {
        const res = await httpClient.get<ApiResult<Ad[]>>('/approvals/pending');
        return res.data.data;
    },

    /**
     * 审批通过
     */
    approveAd: async (id: string): Promise<Ad> => {
        const res = await httpClient.post<ApiResult<Ad>>(`/approvals/${id}/approve`);
        return res.data.data;
    },

    /**
     * 审批驳回
     */
    rejectAd: async (id: string, reason: string): Promise<Ad> => {
        const res = await httpClient.post<ApiResult<Ad>>(`/approvals/${id}/reject`, { reason });
        return res.data.data;
    },

    /**
     * 获取审批历史
     */
    getHistory: async (adId: string): Promise<any[]> => {
        const res = await httpClient.get<ApiResult<any[]>>(`/approvals/history/${adId}`);
        return res.data.data;
    },
};
