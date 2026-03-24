/**
 * SSR 路由
 */

import Router from 'koa-router';
import ssrController from '../modules/ssr/ssr.controller';

const router = new Router(); // 移除 prefix，由父级路由指定

// 渲染页面
router.get('/render/:path(.*)', ssrController.render);

// 预渲染页面
router.post('/prerender', ssrController.prerender);

export default router;
