/**
 * SSR 控制器
 * 处理服务端渲染相关的请求
 */

import { Context } from 'koa';

export class SSRController {
    /**
     * 渲染页面
     */
    async render(ctx: Context) {
        const { path: _path } = ctx.params;
        // TODO: 实现 SSR 渲染逻辑
        ctx.type = 'text/html';
        ctx.body = '<html><body><h1>SSR Page</h1></body></html>';
    }

    /**
     * 预渲染页面
     */
    async prerender(ctx: Context) {
        const { url } = ctx.request.body as any;
        // TODO: 实现预渲染逻辑
        ctx.body = { success: true, url };
    }
}

export default new SSRController();
