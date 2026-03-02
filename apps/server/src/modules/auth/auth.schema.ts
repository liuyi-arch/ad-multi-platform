import { z } from 'zod';

/**
 * 注册请求校验 Schema
 */
export const RegisterSchema = z.object({
    phone: z.string().regex(/^1[3-9]\d{9}$/, '手机号格式不正确'),
    password: z.string().min(6, '密码长度至少为 6 位').max(20, '密码长度最多为 20 位'),
    role: z.enum(['ADVERTISER', 'ADMIN']),
    name: z.string().min(2, '昵称至少 2 个字符').optional(),
});

/**
 * 登录请求校验 Schema
 */
export const LoginSchema = z.object({
    phone: z.string().regex(/^1[3-9]\d{9}$/, '手机号格式不正确'),
    password: z.string().min(1, '请输入密码'),
    role: z.enum(['ADVERTISER', 'ADMIN']),
});

/**
 * 校验失败结果格式化
 */
export const formatZodError = (error: z.ZodError) => {
    return error.issues.map(issue => ({
        field: issue.path.join('.'),
        message: issue.message
    }));
};
