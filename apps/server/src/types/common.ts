/**
 * 通用类型定义
 */

import { PaginatedResponse as SharedPaginatedResponse } from '@repo/shared-types';

// 分页参数
export interface PaginationParams {
    page: number;
    pageSize: number;
}

// 分页响应
export type PaginatedResponse<T> = SharedPaginatedResponse<T>;
