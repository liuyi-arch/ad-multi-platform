
/**
 * 格式化货币 (CNY)
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY',
    minimumFractionDigits: 2,
  }).format(value);
};

/**
 * 格式化大数字 (如 1.2M)
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
