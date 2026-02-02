/**
 * 审批路由
 */

import Router from 'koa-router';
import approvalController from '../modules/approval/approval.controller';
import { authenticate, authorize } from '../middlewares';

const router = new Router({ prefix: '/approvals' });

// 获取待审批列表 (仅管理员)
router.get('/pending', authenticate, authorize('admin'), approvalController.getPendingList);

// 审批通过 (仅管理员)
router.post('/:id/approve', authenticate, authorize('admin'), approvalController.approve);

// 审批驳回 (仅管理员)
router.post('/:id/reject', authenticate, authorize('admin'), approvalController.reject);

// 获取审批历史
router.get('/history/:adId', authenticate, approvalController.getHistory);

export default router;
