/**
 * 错误处理中间件
 * 统一处理应用中的错误,返回标准化的错误响应
 */

import { Context, Next } from 'koa';
import { HttpStatus, BusinessStatus, ErrorMessages } from '../constants';
import { ErrorResponse } from '../types';

export const errorHandler = async (ctx: Context, next: Next) => {
    try {
        await next();
    } catch (err: any) {
        // 记录错误日志
        console.error('Error:', err);

        // 设置响应状态码
        ctx.status = err.status || HttpStatus.INTERNAL_SERVER_ERROR;

        // 构建错误响应
        const response: ErrorResponse = {
            code: err.code || BusinessStatus.FAILED,
            message: err.message || ErrorMessages.INTERNAL_ERROR,
            errors: err.errors,
        };

        ctx.body = response;
    }
};
