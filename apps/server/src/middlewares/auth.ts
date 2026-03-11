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
    const authHeader = ctx.headers.authorization;
    if (!authHeader) {
        ctx.status = HttpStatus.UNAUTHORIZED;
        ctx.body = { code: BusinessStatus.UNAUTHORIZED, message: ErrorMessages.UNAUTHORIZED };
        return;
    }

    const token = authHeader.replace(new RegExp(`^${AUTH_CONFIG.HEADER_PREFIX}`, 'i'), '').trim();
    if (!token) {
        ctx.status = HttpStatus.UNAUTHORIZED;
        ctx.body = { code: BusinessStatus.UNAUTHORIZED, message: ErrorMessages.UNAUTHORIZED };
        return;
    }

    // 1. JWT 验证逻辑（必须独立 Catch，防止捕获下游业务错误）
    let decoded;
    try {
        decoded = jwt.verify(token, appConfig.jwt.secret, { clockTolerance: 60 }) as UserPayload;
    } catch (err: any) {
        // 只有 JWT 验证失败才进入这里
        console.error(`[Auth Middleware] Token Verification Failed: ${err.message}`);
        ctx.status = HttpStatus.UNAUTHORIZED;
        ctx.body = {
            code: BusinessStatus.UNAUTHORIZED,
            message: ErrorMessages.AUTH_TOKEN_INVALID,
            debug: appConfig.env === 'development' ? err.message : undefined
        };
        return;
    }

    // 2. 注入用户信息
    ctx.user = decoded;

    // 3. 执行下一步（保证在 try-catch 外部，防止误捕获业务错误）
    await next();
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
