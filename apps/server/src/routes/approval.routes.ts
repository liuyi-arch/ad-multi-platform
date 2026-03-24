/**
 * 审批路由
 */

import Router from 'koa-router';
import approvalController from '../modules/approval/approval.controller';

const router = new Router(); // 移除 prefix，由父级路由指定

// 获取待审批列表 (TODO: 后续加回认证 + admin 权限)
router.get('/pending', approvalController.getPendingList);

// 审批通过 (TODO: 后续加回认证 + admin 权限)
router.post('/:id/approve', approvalController.approve);

// 审批驳回 (TODO: 后续加回认证 + admin 权限)
router.post('/:id/reject', approvalController.reject);

// 获取审批历史
router.get('/history/:adId', approvalController.getHistory);

export default router;

