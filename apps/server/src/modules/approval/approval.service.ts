/**
 * 审批业务逻辑层
 */

import approvalRepository from './approval.repository';
import adRepository from '../ad/ad.repository';
import { broadcast } from '../../config/websocket';

export class ApprovalService {
    /**
     * 获取待审批列表（所有 status === PENDING 的广告）
     */
    async getPendingList() {
        const result = await adRepository.findMany({ status: 'PENDING', pageSize: 100 });
        return result.items;
    }

    /**
     * 审批通过
     */
    async approve(adId: string, approverId: string) {
        // 查找广告
        const ad = await adRepository.findById(adId);
        if (!ad) {
            const error: any = new Error('广告不存在');
            error.status = 404;
            throw error;
        }

        if (ad.status !== 'PENDING') {
            const error: any = new Error('该广告当前状态无法审批');
            error.status = 400;
            throw error;
        }

        // 更新广告状态
        const updatedAd = await adRepository.update(adId, { status: 'APPROVED' });

        // 创建审批记录
        await approvalRepository.create({
            adId,
            approverId,
            status: 'APPROVED',
        });

        broadcast({ type: 'AD_STATUS_CHANGED', payload: JSON.parse(JSON.stringify(updatedAd)) });
        return updatedAd;
    }

    /**
     * 审批驳回
     */
    async reject(adId: string, approverId: string, reason: string) {
        const ad = await adRepository.findById(adId);
        if (!ad) {
            const error: any = new Error('广告不存在');
            error.status = 404;
            throw error;
        }

        if (ad.status !== 'PENDING') {
            const error: any = new Error('该广告当前状态无法审批');
            error.status = 400;
            throw error;
        }

        // 更新广告状态和驳回原因
        const updatedAd = await adRepository.update(adId, {
            status: 'REJECTED',
            rejectionReason: reason,
        });

        // 创建审批记录
        await approvalRepository.create({
            adId,
            approverId,
            status: 'REJECTED',
            reason,
        });

        broadcast({ type: 'AD_STATUS_CHANGED', payload: JSON.parse(JSON.stringify(updatedAd)) });
        return updatedAd;
    }

    /**
     * 获取审批历史
     */
    async getHistory(adId: string) {
        return approvalRepository.findByAdId(adId);
    }
}

export default new ApprovalService();
