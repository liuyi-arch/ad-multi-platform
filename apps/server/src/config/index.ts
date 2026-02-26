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
    // TODO: 当前版本使用临时模拟 token，待接入 jsonwebtoken 库后启用
    jwt: {
        secret: process.env.JWT_SECRET || 'your-secret-key',
        expiresIn: '7d',
    },

    // API 前缀
    apiPrefix: '/api',
};
