/**
 * 认证相关类型定义
 * 包含角色、表单数据及 DTO
 */

/**
 * 认证相关角色与模式
 */
export type AuthRole = 'ADVERTISER' | 'ADMIN';
export type AuthMode = 'LOGIN' | 'REGISTER';

/**
 * 认证表单数据
 */
export interface AuthResponse {
    token: string;
    user: {
        id: string;
        username?: string;
        phone: string;
        role: string;
    };
}

export interface AuthFormData {
    phone: string;
    password?: string;
    confirmPassword?: string;
    role?: string;
}
