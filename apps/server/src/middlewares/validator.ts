/**
 * 请求验证中间件
 * 用于验证请求参数
 */

import { Context, Next } from 'koa';
import { HttpStatus, BusinessStatus, ErrorMessages } from '../constants';
import { ValidationError } from '../types';

/**
 * 验证中间件工厂函数
 * @param schema 验证规则 (可以使用 Joi、Zod 等库)
 */
export const validate = (schema: any) => {
    return async (ctx: Context, next: Next) => {
        try {
            // TODO: 实现验证逻辑
            // const validated = await schema.validateAsync(ctx.request.body);
            // ctx.request.body = validated;

            await next();
        } catch (err: any) {
            const errors: ValidationError[] = err.details?.map((detail: any) => ({
                field: detail.path.join('.'),
                message: detail.message,
            })) || [];

            ctx.status = HttpStatus.BAD_REQUEST;
            ctx.body = {
                code: BusinessStatus.VALIDATION_ERROR,
                message: ErrorMessages.VALIDATION_ERROR,
                errors,
            };
        }
    };
};
