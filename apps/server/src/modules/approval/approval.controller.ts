/**
 * 审批控制器
 * 处理审批相关的 HTTP 请求
 */

import { Context } from 'koa';
import { success } from '../../utils';
import { SuccessMessages } from '../../constants';

export class ApprovalController {
    /**
     * 获取待审批列表
     */
    async getPendingList(ctx: Context) {
        // TODO: 实现获取待审批列表逻辑
        success(ctx, [], '获取成功');
    }

    /**
     * 审批通过
     */
    async approve(ctx: Context) {
        const { id } = ctx.params;
        // TODO: 实现审批通过逻辑
        success(ctx, { id }, SuccessMessages.APPROVED);
    }

    /**
     * 审批驳回
     */
    async reject(ctx: Context) {
        const { id } = ctx.params;
        const { reason } = ctx.request.body as any;
        // TODO: 实现审批驳回逻辑
        success(ctx, { id, reason }, SuccessMessages.REJECTED);
    }

    /**
     * 获取审批历史
     */
    async getHistory(ctx: Context) {
        const { adId } = ctx.params;
        // TODO: 实现获取审批历史逻辑
        success(ctx, [], '获取成功');
    }
}

export default new ApprovalController();
