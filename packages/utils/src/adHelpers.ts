/**
 * 通用的状态接口，用于统计和过滤逻辑
 */
interface HasStatus {
  status: any;
}

/**
 * 将中文日期字符串转换为时间戳用于比较
 */
export const parseChineseDate = (dateStr: string): number => {
  return new Date(dateStr.replace('年', '-').replace('月', '-').replace('日', '')).getTime();
};

/**
 * 广告通用排序逻辑
 */
export const sortAds = <T extends HasStatus & { bid: number; heat: any; createDate?: string; date?: string }>(
  ads: T[], 
  sortBy: string
): T[] => {
  const data = [...ads];
  switch (sortBy) {
    case 'bid_desc':
      return data.sort((a, b) => b.bid - a.bid);
    case 'heat_desc':
      const getHeat = (h: any) => typeof h === 'number' ? h : parseFloat(String(h)) || 0;
      return data.sort((a, b) => getHeat(b.heat) - getHeat(a.heat));
    case 'time':
    default:
      return data.sort((a, b) => {
        const dateA = a.createDate || a.date || '';
        const dateB = b.createDate || b.date || '';
        return parseChineseDate(dateB) - parseChineseDate(dateA);
      });
  }
};

/**
 * 计算广告统计数据（通用版）
 */
export const calculateAdStats = <T extends HasStatus>(ads: T[], statusEnum: any) => {
  return {
    total: ads.length,
    approved: ads.filter(a => a.status === statusEnum.APPROVED).length,
    pending: ads.filter(a => a.status === statusEnum.PENDING).length,
    rejected: ads.filter(a => a.status === statusEnum.REJECTED).length,
  };
};

/**
 * 根据状态过滤广告列表（通用版）
 */
export const filterAdsByStatus = <T extends HasStatus>(ads: T[], status: any, statusEnum: any) => {
  if (status === 'ALL') return ads;
  return ads.filter(ad => ad.status === status);
};
