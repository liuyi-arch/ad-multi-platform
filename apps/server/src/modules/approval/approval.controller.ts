/**
 * 审批控制器
 * 处理审批相关的 HTTP 请求
 */

import { Context } from 'koa';
import approvalService from './approval.service';
import { success } from '../../utils';
import { SuccessMessages } from '../../constants';

export class ApprovalController {
    /**
     * 获取待审批列表
     * GET /api/approvals/pending
     */
    async getPendingList(ctx: Context) {
        const list = await approvalService.getPendingList();
        success(ctx, list, '获取成功');
    }

    /**
     * 审批通过
     * POST /api/approvals/:id/approve
     */
    async approve(ctx: Context) {
        const { id } = ctx.params;
        // TODO: 后续从 JWT 中获取 approverId
        const approverId = 'admin-1';
        const ad = await approvalService.approve(id, approverId);
        success(ctx, ad, SuccessMessages.APPROVED);
    }

    /**
     * 审批驳回
     * POST /api/approvals/:id/reject
     */
    async reject(ctx: Context) {
        const { id } = ctx.params;
        const { reason } = ctx.request.body as any;
        // TODO: 后续从 JWT 中获取 approverId
        const approverId = 'admin-1';
        const ad = await approvalService.reject(id, approverId, reason || '未提供原因');
        success(ctx, ad, SuccessMessages.REJECTED);
    }

    /**
     * 获取审批历史
     * GET /api/approvals/history/:adId
     */
    async getHistory(ctx: Context) {
        const { adId } = ctx.params;
        const history = await approvalService.getHistory(adId);
        success(ctx, history, '获取成功');
    }
}

export default new ApprovalController();
