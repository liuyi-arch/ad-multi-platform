/**
 * Koa Context 扩展类型
 * 用于扩展 Koa 的 Context 类型,添加自定义属性
 */

import { Context } from 'koa';
import { AuthRole } from '@repo/shared-types';

// 扩展的用户信息（与 auth.model 对齐）
export interface UserPayload {
    id: string;
    phone: string;
    role: AuthRole;
}

// 扩展 Koa Context
export interface ExtendedContext extends Context {
    // 当前登录用户
    user?: UserPayload;

    // 请求 ID (用于日志追踪)
    requestId?: string;
}
