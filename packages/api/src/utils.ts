import httpClient from './httpClient';
import { Ad } from '@repo/shared-types';

/**
 * 获取资产基础 URL
 */
export const getAssetBaseUrl = () => {
    const baseUrl = String((httpClient.defaults as any)?.baseURL || '');
    return baseUrl.replace(/\/?api\/?$/, '');
};

/**
 * 解析并拼接资产 URL
 * @param url 相对路径或绝对路径
 * @returns 完整的资产 URL
 */
export const resolveAssetUrl = (url?: string): string => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    const base = getAssetBaseUrl();
    if (!base) return url;
    const normalizedPath = url.startsWith('/') ? url : `/${url}`;
    return `${base}${normalizedPath}`;
};

/**
 * 规范化广告的资产 URL
 * @param ad 广告对象
 * @returns 带有完整 URL 的广告对象
 */
export const normalizeAdAssets = (ad: Ad): Ad => {
    return {
        ...ad,
        imageUrl: resolveAssetUrl(ad.imageUrl),
        thumbnail: resolveAssetUrl(ad.thumbnail),
        videoUrls: ad.videoUrls?.map((u) => resolveAssetUrl(u) || '')?.filter(Boolean),
    };
};
