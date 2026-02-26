/**
 * 认证路由
 */

import Router from 'koa-router';
import authController from '../modules/auth/auth.controller';
import { authenticate } from '../middlewares';

const router = new Router({ prefix: '/auth' }); // 规范化前缀为 /auth

// 用户登录
router.post('/login', authController.login);

// 用户注册
router.post('/register', authController.register);

// 获取认证信息 (需要认证)
router.get('/me', authenticate, authController.getCurrentUser);

// 更新个人档案 (需要认证)
router.put('/profile', authenticate, authController.updateProfile);

export default router;
