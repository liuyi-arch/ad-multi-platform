/**
 * 日志中间件
 * 记录每个请求的信息
 */

import { Context, Next } from 'koa';

export const logger = async (ctx: Context, next: Next) => {
    const start = Date.now();

    // 生成请求 ID
    ctx.state.requestId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    await next();

    const ms = Date.now() - start;

    console.log(`[${ctx.state.requestId}] ${ctx.method} ${ctx.url} - ${ctx.status} - ${ms}ms`);
};
