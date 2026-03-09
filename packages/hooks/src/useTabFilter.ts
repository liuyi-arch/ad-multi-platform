import { useState, useMemo } from 'react';
import { Ad, AdStatus } from '@repo/shared-types';
import { filterAdsByStatus } from '@repo/utils';

export type FilterType = 'ALL' | AdStatus;

/**
 * 封装广告列表过滤逻辑的共享 Hook
 */
export const useTabFilter = (ads: Ad[]) => {
  const [activeTab, setActiveTab] = useState<FilterType>('ALL');

  const tabfilterAds = useMemo(() => {
    return filterAdsByStatus(ads, activeTab);
  }, [ads, activeTab]);

  return {
    activeTab,
    setActiveTab,
    tabfilterAds
  };
};
