/**
 * 验证工具函数
 */

/**
 * 验证邮箱格式
 */
export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * 验证 URL 格式
 */
export const isValidUrl = (url: string): boolean => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

/**
 * 验证字符串长度
 */
export const isValidLength = (
    str: string,
    min: number,
    max: number
): boolean => {
    const length = str.length;
    return length >= min && length <= max;
};

/**
 * 验证数值范围
 */
export const isValidRange = (
    value: number,
    min: number,
    max: number
): boolean => {
    return value >= min && value <= max;
};

/**
 * 验证必填字段
 */
export const isRequired = (value: any): boolean => {
    if (value === null || value === undefined) return false;
    if (typeof value === 'string') return value.trim().length > 0;
    return true;
};
