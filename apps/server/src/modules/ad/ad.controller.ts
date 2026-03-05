/**
 * 广告控制器
 * 处理广告相关的 HTTP 请求
 */

import { Context } from 'koa';
import adService from './ad.service';
import { success } from '../../utils';
import { SuccessMessages } from '../../constants';
import { ExtendedContext } from '../../types';

export class AdController {
    /**
     * 获取广告列表
     * GET /api/ads?page=1&pageSize=20&status=PENDING&keyword=科技
     */
    async list(ctx: Context) {
        const { page, pageSize, status, category, keyword, sortBy, sortOrder } = ctx.query;
        const result = await adService.getList({
            page: page ? Number(page) : undefined,
            pageSize: pageSize ? Number(pageSize) : undefined,
            status: status as string,
            category: category as string,
            keyword: keyword as string,
            sortBy: sortBy as string,
            sortOrder: sortOrder as 'asc' | 'desc',
        });
        success(ctx, result, '获取成功');
    }

    /**
     * 获取广告详情
     * GET /api/ads/:id
     */
    async getById(ctx: Context) {
        const { id } = ctx.params;
        const ad = await adService.getById(id);
        success(ctx, ad, '获取成功');
    }

    /**
     * 创建广告
     * POST /api/ads
     */
    async create(ctx: ExtendedContext) {
        const data = ctx.request.body as any;
        const ad = await adService.create(data, ctx.user);
        success(ctx, ad, SuccessMessages.CREATED);
    }

    /**
     * 更新广告
     * PUT /api/ads/:id
     */
    async update(ctx: ExtendedContext) {
        const { id } = ctx.params;
        const data = ctx.request.body as any;
        const ad = await adService.update(id, data);
        success(ctx, ad, SuccessMessages.UPDATED);
    }

    /**
     * 删除广告
     * DELETE /api/ads/:id
     */
    async delete(ctx: ExtendedContext) {
        const { id } = ctx.params;
        await adService.delete(id);
        success(ctx, null, SuccessMessages.DELETED);
    }

    /**
     * 增加广告热度
     * PUT /api/ads/:id/heat
     */
    async incrementHeat(ctx: Context) {
        const { id } = ctx.params;
        const ad = await adService.incrementHeat(id);
        success(ctx, ad, '热度更新成功');
    }
}

export default new AdController();
