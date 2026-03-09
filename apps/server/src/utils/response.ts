/**
 * 统一响应格式工具
 * 用于构建标准化的 API 响应
 */

import { Context } from 'koa';
import { BusinessStatus, SuccessMessages } from '../constants';
import { SuccessResponse, ErrorResponse, ValidationError } from '../types';

/**
 * 成功响应
 */
export const success = <T = any>(
    ctx: Context,
    data: T,
    message: string = SuccessMessages.CREATED
): void => {
    const response: SuccessResponse<T> = {
        code: BusinessStatus.SUCCESS,
        message,
        data,
    };

    ctx.body = response;
};

/**
 * 错误响应
 */
export const error = (
    ctx: Context,
    httpStatus: number,
    message: string,
    businessCode: number = BusinessStatus.FAILED,
    errors?: ValidationError[]
): void => {
    ctx.status = httpStatus; // 设置 HTTP 状态码
    const response: ErrorResponse = {
        code: businessCode,
        message,
        errors,
    };

    ctx.body = response;
};
