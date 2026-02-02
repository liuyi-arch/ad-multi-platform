/**
 * SSR (服务端渲染) 配置
 * 用于配置 React SSR 相关参数
 */

export const ssrConfig = {
    // 是否启用 SSR
    enabled: process.env.SSR_ENABLED === 'true',

    // 渲染超时时间 (毫秒)
    timeout: 5000,

    // 缓存配置
    cache: {
        // 是否启用缓存
        enabled: process.env.NODE_ENV === 'production',
        // 缓存过期时间 (秒)
        ttl: 60 * 5, // 5分钟
    },

    // 需要 SSR 的路由
    routes: [
        '/',
        '/ads/:id',
    ],

    // 静态资源路径
    assetsPath: process.env.ASSETS_PATH || '../advertiser-web/dist',
};
