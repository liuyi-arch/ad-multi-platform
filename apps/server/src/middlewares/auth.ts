import jwt from 'jsonwebtoken';
import { Next } from 'koa';
import { AUTH_CONFIG, HttpStatus, BusinessStatus, ErrorMessages } from '../constants';
import { ExtendedContext, UserPayload } from '../types';
import { AuthRole } from '@repo/shared-types';
import { appConfig } from '../config';

/**
 * JWT 认证中间件
 * 从请求头中提取 token 并验证
 */
export const authenticate = async (ctx: ExtendedContext, next: Next) => {
    const token = ctx.headers.authorization?.replace(AUTH_CONFIG.HEADER_PREFIX, '');

    if (!token) {
        ctx.status = HttpStatus.UNAUTHORIZED;
        ctx.body = {
            code: BusinessStatus.UNAUTHORIZED,
            message: ErrorMessages.UNAUTHORIZED,
        };
        return;
    }

    try {
        const decoded = jwt.verify(token, appConfig.jwt.secret) as UserPayload;
        ctx.user = decoded;

        await next();
    } catch (err) {
        ctx.status = HttpStatus.UNAUTHORIZED;
        ctx.body = {
            code: BusinessStatus.UNAUTHORIZED,
            message: ErrorMessages.AUTH_TOKEN_INVALID,
        };
    }
};

/**
 * 权限检查中间件
 * 检查用户是否有指定角色
 */
export const authorize = (...roles: AuthRole[]) => {
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
