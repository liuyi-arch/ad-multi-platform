import { useMemo } from 'react';
import { Ad, AdStatus, StatItem } from '@repo/shared-types';
import { calculateAdStats } from '@repo/utils';

/**
 * 专门负责广告统计逻辑的共享 Hook
 */
export const useAdStats = (ads: Ad[]) => {
  const statCardState = useMemo(() => calculateAdStats(ads, AdStatus), [ads]);

  const stats: StatItem[] = useMemo(() => {
    return [
      {
        label: '总广告数',
        value: statCardState.total.toLocaleString(),
        trend: '+12%',
        isPositive: true,
        icon: 'ads_click',
        colorClass: 'bg-blue-50 text-primary'
      },
      {
        label: '已通过广告',
        value: statCardState.approved.toLocaleString(),
        trend: '+5%',
        isPositive: true,
        icon: 'check_circle',
        colorClass: 'bg-emerald-50 text-emerald-600'
      },
      {
        label: '待审核广告',
        value: statCardState.pending.toLocaleString(),
        trend: '+18.4%',
        isPositive: true,
        icon: 'pending',
        colorClass: 'bg-orange-50 text-orange-600'
      },
      {
        label: '已拒绝广告',
        value: statCardState.rejected.toLocaleString(),
        trend: '-2.1%',
        isPositive: false,
        icon: 'block',
        colorClass: 'bg-red-50 text-red-600'
      }
    ];
  }, [statCardState]);

  return {
    statCardState,
    stats
  };
};
