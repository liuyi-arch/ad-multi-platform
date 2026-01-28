
import { Ad } from '../types';

/**
 * 将中文日期字符串转换为时间戳用于比较
 */
export const parseChineseDate = (dateStr: string): number => {
  return new Date(dateStr.replace('年', '-').replace('月', '-').replace('日', '')).getTime();
};

/**
 * 广告通用排序逻辑
 */
export const sortAds = (ads: Ad[], sortBy: string): Ad[] => {
  const data = [...ads];
  switch (sortBy) {
    case 'bid_desc':
      return data.sort((a, b) => b.bid - a.bid);
    case 'heat_desc':
      return data.sort((a, b) => b.heat - a.heat);
    case 'time':
    default:
      return data.sort((a, b) => parseChineseDate(b.createDate) - parseChineseDate(a.createDate));
  }
};
