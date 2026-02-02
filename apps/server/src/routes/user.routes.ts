/**
 * 用户路由
 */

import Router from 'koa-router';
import userController from '../modules/user/user.controller';
import { authenticate } from '../middlewares';

const router = new Router({ prefix: '/users' });

// 用户登录
router.post('/login', userController.login);

// 用户注册
router.post('/register', userController.register);

// 获取当前用户信息 (需要认证)
router.get('/me', authenticate, userController.getCurrentUser);

// 更新用户信息 (需要认证)
router.put('/profile', authenticate, userController.updateProfile);

export default router;
