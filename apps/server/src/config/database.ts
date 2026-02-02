/**
 * 数据库配置
 * 用于配置 Prisma 数据库连接和相关参数
 */

export const databaseConfig = {
    // 数据库连接 URL (从环境变量读取)
    url: process.env.DATABASE_URL || 'file:./dev.db',

    // 连接池配置
    pool: {
        min: 2,
        max: 10,
    },

    // 日志级别
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
};
