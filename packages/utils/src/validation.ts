/**
 * 认证相关校验逻辑
 */

import { AuthFormData, AuthMode } from '@repo/shared-types';

export const validatePhone = (phone: string): string | null => {
    if (!phone) return '请输入手机号';
    if (!/^1[3-9]\d{9}$/.test(phone)) {
        return '请输入正确的11位手机号码';
    }
    return null;
};

export const validatePassword = (password: string): string | null => {
    if (!password) return '请输入密码';
    if (password.length < 6) {
        return '密码长度至少需要6位';
    }
    return null;
};

export const validateConfirmPassword = (password: string, confirmPassword?: string): string | null => {
    if (password !== confirmPassword) {
        return '两次输入的密码不一致';
    }
    return null;
};

/**
 * 统一执行表单校验
 * @returns 错误消息，若无错误则返回 null
 */
export const validateAuthForm = (data: AuthFormData, mode: AuthMode): string | null => {
    const phoneError = validatePhone(data.phone ?? '');
    if (phoneError) return phoneError;

    const passwordError = validatePassword(data.password ?? '');
    if (passwordError) return passwordError;

    if (mode === 'REGISTER') {
        const confirmError = validateConfirmPassword(data.password ?? '', data.confirmPassword);
        if (confirmError) return confirmError;
    }

    return null;
};
