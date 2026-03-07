import { PaginationParams } from './api';

/**
 * 广告列表请求参数
 */
export interface AdListParams extends PaginationParams {
    status?: string;
    category?: string;
    keyword?: string;
}
