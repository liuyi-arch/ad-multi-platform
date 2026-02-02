/**
 * 通用类型定义
 */

// 分页参数
export interface PaginationParams {
    page: number;
    pageSize: number;
}

// 分页响应
export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

// 排序参数
export interface SortParams {
    sortBy: string;
    sortOrder: 'asc' | 'desc';
}

// ID 参数
export interface IdParam {
    id: string | number;
}

// 时间戳
export interface Timestamps {
    createdAt: Date;
    updatedAt: Date;
}

// 软删除
export interface SoftDelete {
    deletedAt: Date | null;
}
