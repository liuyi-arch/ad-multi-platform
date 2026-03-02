/**
 * 错误处理中间件
 * 统一处理应用中的错误,返回标准化的错误响应
 */

import { Context, Next } from 'koa';
import { HttpStatus, BusinessStatus, ErrorMessages } from '../constants';
import { ErrorResponse } from '../types';
import { ZodError } from 'zod';
import { AuthBusinessError } from '../modules/auth/auth.service';
import { formatZodError } from '../modules/auth/auth.schema';

export const errorHandler = async (ctx: Context, next: Next) => {
    try {
        await next();
    } catch (err: any) {
        // 记录错误日志
        console.error('Error:', err);

        let status: number = HttpStatus.INTERNAL_SERVER_ERROR;
        let code: number = BusinessStatus.FAILED;
        let message = err.message || ErrorMessages.INTERNAL_ERROR;
        let errors = err.errors;

        // 1. Zod 校验错误 -> 400 Bad Request
        if (err instanceof ZodError) {
            status = HttpStatus.BAD_REQUEST;
            code = BusinessStatus.VALIDATION_ERROR;
            message = ErrorMessages.VALIDATION_ERROR;
            errors = formatZodError(err);
        }
        // 2. 业务自定义错误 -> 映射状态码
        else if (err instanceof AuthBusinessError) {
            code = err.code;
            if (code === BusinessStatus.UNAUTHORIZED) status = HttpStatus.UNAUTHORIZED;
            else if (code === BusinessStatus.NOT_FOUND) status = HttpStatus.NOT_FOUND;
            else if (code === BusinessStatus.FORBIDDEN) status = HttpStatus.FORBIDDEN;
            else if (code === BusinessStatus.DUPLICATE) status = HttpStatus.BAD_REQUEST;
            else status = HttpStatus.BAD_REQUEST; // 其他业务错误
        }
        else {
            // 处理原生带有 status 的错误 (如 koa-body 限制)
            if (err.status) status = err.status;
        }

        // 设置响应状态码
        ctx.status = status;

        // 构建错误响应
        const response: ErrorResponse = {
            code,
            message,
            errors,
        };

        ctx.body = response;
    }
};
