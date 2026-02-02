/**
 * 认证中间件
 * 验证 JWT token 并提取用户信息
 */

import { Context, Next } from 'koa';
import { HttpStatus, BusinessStatus, ErrorMessages } from '../constants';
import { ExtendedContext } from '../types';

/**
 * JWT 认证中间件
 * 从请求头中提取 token 并验证
 */
export const authenticate = async (ctx: ExtendedContext, next: Next) => {
    const token = ctx.headers.authorization?.replace('Bearer ', '');

    if (!token) {
        ctx.status = HttpStatus.UNAUTHORIZED;
        ctx.body = {
            code: BusinessStatus.UNAUTHORIZED,
            message: ErrorMessages.UNAUTHORIZED,
        };
        return;
    }

    try {
        // TODO: 实现 JWT 验证逻辑
        // const decoded = jwt.verify(token, appConfig.jwt.secret);
        // ctx.user = decoded;

        // 临时模拟用户信息
        ctx.user = {
            id: '1',
            email: 'user@example.com',
            role: 'advertiser',
        };

        await next();
    } catch (err) {
        ctx.status = HttpStatus.UNAUTHORIZED;
        ctx.body = {
            code: BusinessStatus.UNAUTHORIZED,
            message: ErrorMessages.UNAUTHORIZED,
        };
    }
};

/**
 * 权限检查中间件
 * 检查用户是否有指定角色
 */
export const authorize = (...roles: string[]) => {
    return async (ctx: ExtendedContext, next: Next) => {
        if (!ctx.user) {
            ctx.status = HttpStatus.UNAUTHORIZED;
            ctx.body = {
                code: BusinessStatus.UNAUTHORIZED,
                message: ErrorMessages.UNAUTHORIZED,
            };
            return;
        }

        if (!roles.includes(ctx.user.role)) {
            ctx.status = HttpStatus.FORBIDDEN;
            ctx.body = {
                code: BusinessStatus.FORBIDDEN,
                message: ErrorMessages.FORBIDDEN,
            };
            return;
        }

        await next();
    };
};
