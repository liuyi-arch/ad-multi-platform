/**
 * 配置文件统一导出
 */

export * from './database';
export * from './upload';
export * from './ssr';

// 通用配置
export const appConfig = {
    // 应用端口
    port: process.env.PORT || 3000,

    // 应用环境
    env: process.env.NODE_ENV || 'development',

    // CORS 配置
    cors: {
        origin: process.env.CORS_ORIGIN || '*',
        credentials: true,
    },

    // JWT 配置
    jwt: {
        secret: process.env.JWT_SECRET || 'your-secret-key',
        expiresIn: '7d' as string | number, // 明确类型以适配 jsonwebtoken
    },

    // API 前缀
    apiPrefix: '/api',
};
