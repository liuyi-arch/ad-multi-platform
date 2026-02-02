/**
 * 用户类型定义
 */

export interface User {
    id: string;
    email: string;
    password: string;
    role: 'admin' | 'advertiser';
    name?: string;
    avatar?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface LoginDto {
    email: string;
    password: string;
}

export interface RegisterDto {
    email: string;
    password: string;
    name?: string;
    role: 'admin' | 'advertiser';
}

export interface UpdateProfileDto {
    name?: string;
    avatar?: string;
}
