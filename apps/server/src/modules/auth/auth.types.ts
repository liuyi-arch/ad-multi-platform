/**
 * 认证相关类型定义
 * 同步自 @repo/shared-types 规范
 */

import { AuthRole } from '@repo/shared-types';

export interface AuthInfo {
    id: string;
    phone: string;
    password: string;
    role: AuthRole;
    name?: string;
    avatar?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface LoginDto {
    phone: string;
    password: string;
    role: AuthRole;
}

export interface RegisterDto {
    phone: string;
    password: string;
    role: AuthRole;
    name?: string;
}

export interface UpdateProfileDto {
    name?: string;
    avatar?: string;
    phone?: string;
}
