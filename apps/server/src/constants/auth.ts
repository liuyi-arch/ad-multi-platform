/**
 * 认证相关常量
 */

export const AUTH_CONFIG = {
    // Bcrypt 哈希强度
    SALT_ROUNDS: 10,

    // 自定义请求头
    HEADER_PREFIX: 'Bearer ',
} as const;
