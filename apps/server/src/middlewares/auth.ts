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
        ctx.body = {
            code: BusinessStatus.UNAUTHORIZED,
            message: ErrorMessages.UNAUTHORIZED,
        };
        return;
    }

    // 兼容大小写不敏感的 Bearer 前缀并去除多余空格
    const token = authHeader.replace(new RegExp(`^${AUTH_CONFIG.HEADER_PREFIX}`, 'i'), '').trim();

    if (!token) {
        ctx.status = HttpStatus.UNAUTHORIZED;
        ctx.body = {
            code: BusinessStatus.UNAUTHORIZED,
            message: ErrorMessages.UNAUTHORIZED,
        };
        return;
    }

    try {
        // 增加 clockTolerance 处理客户端与服务器之间可能的微小时钟偏移（60秒）
        const decoded = jwt.verify(token, appConfig.jwt.secret, { clockTolerance: 60 }) as UserPayload;
        ctx.user = decoded;

        await next();
    } catch (err: any) {
        // 生产环境下通过控制台记录详细错误，方便通过 docker logs 排查
        console.error(`[Auth] JWT Verification Failed for ${ctx.path}:`, err.message);

        ctx.status = HttpStatus.UNAUTHORIZED;
        ctx.body = {
            code: BusinessStatus.UNAUTHORIZED,
            message: ErrorMessages.AUTH_TOKEN_INVALID,
            // 仅在非生产环境输出具体错误信息给前端，生产环境保持模糊以保安全
            debug: appConfig.env === 'development' ? err.message : undefined
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
