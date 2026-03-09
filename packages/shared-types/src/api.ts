/**
 * 分页请求参数
 */
export interface PaginationParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * 分页响应格式 (标准格式，items 为数据主体)
 */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/**
 * 服务端统一响应结构
 */
export interface ApiResult<T> {
  code: number;
  message: string;
  data: T;
}
