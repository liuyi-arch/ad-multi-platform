/**
 * API 相关类型定义
 */

import { BusinessStatus } from '../constants';

// API 响应基础结构
export interface ApiResponse<T = any> {
    code: number;
    message: string;
    data?: T;
}

// 成功响应
export interface SuccessResponse<T = any> extends ApiResponse<T> {
    code: typeof BusinessStatus.SUCCESS;
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
