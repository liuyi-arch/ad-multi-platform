/**
 * 广告路由
 */

import Router from 'koa-router';
import adController from '../modules/ad/ad.controller';
import { authenticate } from '../middlewares/auth';

const router = new Router({ prefix: '/ads' });

// 获取广告列表
router.get('/', adController.list);

// 获取广告详情
router.get('/:id', adController.getById);

// 创建广告 (已加回认证)
router.post('/', authenticate, adController.create);

// 更新广告 (已加回认证)
router.put('/:id', authenticate, adController.update);

// 删除广告 (已加回认证)
router.delete('/:id', authenticate, adController.delete);

export default router;

