/**
 * CORS 中间件
 * 处理跨域请求
 */

import { Context, Next } from 'koa';
import { appConfig } from '../config';

export const cors = async (ctx: Context, next: Next) => {
    // 设置 CORS 头
    ctx.set('Access-Control-Allow-Origin', appConfig.cors.origin);
    ctx.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (appConfig.cors.credentials) {
        ctx.set('Access-Control-Allow-Credentials', 'true');
    }

    // 处理 OPTIONS 预检请求
    if (ctx.method === 'OPTIONS') {
        ctx.status = 204;
        return;
    }

    await next();
};
