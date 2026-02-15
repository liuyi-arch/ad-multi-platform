
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
