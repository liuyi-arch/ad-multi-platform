/**
 * 动态表单路由
 */

import Router from 'koa-router';
import formController from '../modules/form/form.controller';
import { authenticate, authorize } from '../middlewares';

const router = new Router(); // 移除 prefix，由父级路由指定

// 获取表单配置
router.get('/:formId', formController.getConfig);

// 创建表单配置 (仅管理员)
router.post('/', authenticate, authorize('ADMIN'), formController.createConfig);

// 更新表单配置 (仅管理员)
router.put('/:formId', authenticate, authorize('ADMIN'), formController.updateConfig);

// 提交表单数据 (需要认证)
router.post('/:formId/submit', authenticate, formController.submitData);

export default router;
