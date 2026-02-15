/**
 * 广告路由
 */

import Router from 'koa-router';
import adController from '../modules/ad/ad.controller';

const router = new Router({ prefix: '/ads' });

// 获取广告列表
router.get('/', adController.list);

// 获取广告详情
router.get('/:id', adController.getById);

// 创建广告 (TODO: 后续加回认证中间件)
router.post('/', adController.create);

// 更新广告 (TODO: 后续加回认证中间件)
router.put('/:id', adController.update);

// 删除广告 (TODO: 后续加回认证中间件)
router.delete('/:id', adController.delete);

export default router;

