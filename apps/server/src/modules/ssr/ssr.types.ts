/**
 * SSR 类型定义
 */

export interface SSROptions {
    url: string;
    timeout?: number;
    cache?: boolean;
}

export interface SSRResult {
    html: string;
    statusCode: number;
    headers?: Record<string, string>;
}
