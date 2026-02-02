/**
 * 日期处理工具
 */

/**
 * 格式化日期
 */
export const formatDate = (date: Date, format: string = 'YYYY-MM-DD'): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return format
        .replace('YYYY', String(year))
        .replace('MM', month)
        .replace('DD', day)
        .replace('HH', hours)
        .replace('mm', minutes)
        .replace('ss', seconds);
};

/**
 * 获取当前时间戳
 */
export const now = (): number => {
    return Date.now();
};

/**
 * 日期加减
 */
export const addDays = (date: Date, days: number): Date => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};

/**
 * 计算日期差
 */
export const diffDays = (date1: Date, date2: Date): number => {
    const diff = Math.abs(date1.getTime() - date2.getTime());
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
};
