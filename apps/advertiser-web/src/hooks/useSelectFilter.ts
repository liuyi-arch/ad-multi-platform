
import { useState, useMemo } from 'react';
import { Ad } from '../types';
import { sortAds } from '@repo/utils';

/**
 * 封装选择器过滤逻辑（排序逻辑）
 */
export const useSelectFilter = (ads: Ad[]) => {
  const [activeSelect, setActiveSelect] = useState('time');

  const selectFilterAds = useMemo(() => {
    return sortAds(ads, activeSelect);
  }, [ads, activeSelect]);

  const handleSelectChange = (value: string) => {
    setActiveSelect(value);
  };

  return {
    activeSelect,
    setActiveSelect: handleSelectChange,
    selectFilterAds
  };
};
