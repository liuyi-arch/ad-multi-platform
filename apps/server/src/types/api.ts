/**
 * API 相关类型定义
 */

import { ApiResponse as SharedApiResponse } from '@repo/shared-types';
import { BusinessStatus } from '../constants';

// API 响应基础结构
export type ApiResponse<T = any> = SharedApiResponse<T>;

// 成功响应
export interface SuccessResponse<T = any> extends ApiResponse<T> {
    code: typeof BusinessStatus.SUCCESS;
    message: string;
    data: T;
}

// 错误响应
export interface ErrorResponse extends ApiResponse {
    code: number;
    message: string;
    errors?: ValidationError[];
}

// 验证错误
export interface ValidationError {
    field: string;
    message: string;
}

// 文件上传响应
export interface UploadResponse {
    url: string;
    filename: string;
    size: number;
    mimeType: string;
}
