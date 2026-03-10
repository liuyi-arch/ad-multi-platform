
/**
 * 货币格式化工具
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY',
  }).format(value);
};

/**
 * 数字格式化（千分位）
 */
export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('zh-CN').format(value);
};

/**
 * 格式化日期
 */
export const formatDate = (date: string | Date): string => {
  if (typeof date === 'string') return date;
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * 格式化价格（货币符号 + 两位小数）
 */
export const formatPrice = (value: number): string => {
  if (typeof value !== 'number' || isNaN(value)) return '¥0.00';
  return `¥${value.toFixed(2)}`;
};

/**
 * 格式化热度（k单位转化）
 */
export const formatHeat = (value: number | string): string => {
  if (value === undefined || value === null) return '0';
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(numValue)) return '0';
  if (numValue >= 1000) {
    return `${(numValue / 1000).toFixed(1)}k`;
  }
  return numValue.toString();
};

/**
 * 格式化时间 (秒 -> mm:ss)
 * @param seconds 秒数
 * @returns 格式化后的时间字符串
 */
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

