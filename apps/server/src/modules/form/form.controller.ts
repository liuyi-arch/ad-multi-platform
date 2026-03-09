/**
 * 动态表单控制器
 * 处理动态表单相关的 HTTP 请求
 */

import { Context } from 'koa';
import { success } from '../../utils';
import { SuccessMessages } from '../../constants';

export class FormController {
    /**
     * 获取表单配置
     */
    async getConfig(ctx: Context) {
        const { formId: _formId } = ctx.params;
        // TODO: 实现获取表单配置逻辑
        success(ctx, {}, '获取成功');
    }

    /**
     * 创建表单配置
     */
    async createConfig(ctx: Context) {
        const data = ctx.request.body;
        // TODO: 实现创建表单配置逻辑
        success(ctx, data, SuccessMessages.CREATED);
    }

    /**
     * 更新表单配置
     */
    async updateConfig(ctx: Context) {
        const { formId } = ctx.params;
        const data = ctx.request.body;
        // TODO: 实现更新表单配置逻辑
        success(ctx, { formId, ...data }, SuccessMessages.UPDATED);
    }

    /**
     * 提交表单数据
     */
    async submitData(ctx: Context) {
        const { formId } = ctx.params;
        const data = ctx.request.body;
        // TODO: 实现提交表单数据逻辑
        success(ctx, { formId, data }, '提交成功');
    }
}

export default new FormController();
