/**
 * API 路由总入口
 * 整合所有业务模块的路由
 */

import Router from 'koa-router';
import adRoutes from './ad.routes';
import approvalRoutes from './approval.routes';
import uploadRoutes from './upload.routes';
import formRoutes from './form.routes';
import authRoutes from './auth.routes';
import ssrRoutes from './ssr.routes';
import { appConfig } from '../config';

const router = new Router({ prefix: appConfig.apiPrefix });

// 健康检查
router.get('/health', (ctx) => {
    ctx.body = { status: 'ok', timestamp: new Date().toISOString() };
});

// 注册各模块路由
router.use('/ads', adRoutes.routes(), adRoutes.allowedMethods());
router.use('/approvals', approvalRoutes.routes(), approvalRoutes.allowedMethods());
router.use('/upload', uploadRoutes.routes(), uploadRoutes.allowedMethods());
router.use('/forms', formRoutes.routes(), formRoutes.allowedMethods());
router.use('/auth', authRoutes.routes(), authRoutes.allowedMethods());
router.use('/ssr', ssrRoutes.routes(), ssrRoutes.allowedMethods());

export default router;
