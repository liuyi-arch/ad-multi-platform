import { Ad } from '@repo/shared-types';

/**
 * 获取静态资源的基础访问路径
 * @param apiBaseUrl API 基础路径
 */
export const getAssetBaseUrl = (apiBaseUrl: string): string => {
    return apiBaseUrl.replace(/\/?api\/?$/, '');
};

/**
 * 将相对路径解析为完整的静态资源 URL
 * @param url 相对路径或绝对路径
 * @param apiBaseUrl API 基础路径
 */
export const resolveAssetUrl = (url: string | undefined, apiBaseUrl: string): string => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    const base = getAssetBaseUrl(apiBaseUrl);
    if (!base) return url;
    const normalizedPath = url.startsWith('/') ? url : `/${url}`;
    return `${base}${normalizedPath}`;
};

/**
 * 规范化对象中的所有静态资源字段
 * @param ad 广告对象
 * @param apiBaseUrl API 基础路径
 */
export const normalizeAdAssets = (ad: Ad, apiBaseUrl: string): Ad => {
    return {
        ...ad,
        imageUrl: resolveAssetUrl(ad.imageUrl, apiBaseUrl),
        thumbnail: resolveAssetUrl(ad.thumbnail, apiBaseUrl),
        videoUrls: ad.videoUrls?.map((u: string) => resolveAssetUrl(u, apiBaseUrl) || '')?.filter(Boolean),
    };
};
