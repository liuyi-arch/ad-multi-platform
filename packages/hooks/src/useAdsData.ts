import { useState } from 'react';
import { Ad, AdStatus } from '@repo/shared-types';

/**
 * 通用的广告数据管理 Hook
 * 支持基本的 CRUD 操作
 */
export const useAdsData = (initialAds: Ad[]) => {
  const [ads, setAds] = useState<Ad[]>(initialAds);

  const addAd = (payload: Partial<Ad>) => {
    const newAd: Ad = {
      ...payload,
      id: payload.id || `AD-${Math.floor(1000 + Math.random() * 9000)}`,
      status: payload.status || AdStatus.PENDING,
      title: payload.title || '',
      description: payload.description || '',
      bid: payload.bid || 0,
      heat: payload.heat || 0,
      createDate: payload.createDate || new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' }),
      date: payload.date || new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' }),
      imageUrl: payload.imageUrl || 'https://picsum.photos/400/250',
      thumbnail: payload.thumbnail || 'https://picsum.photos/400/225',
    } as Ad;
    setAds(prev => [newAd, ...prev]);
  };

  const updateAd = (id: string, payload: Partial<Ad>) => {
    setAds(prev => prev.map(a => a.id === id ? { ...a, ...payload } : a));
  };

  const deleteAd = (id: string) => {
    setAds(prev => prev.filter(a => a.id !== id));
  };

  const updateAdStatus = (id: string, status: AdStatus) => {
    setAds(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  };

  return {
    ads,
    setAds,
    addAd,
    updateAd,
    deleteAd,
    updateAdStatus
  };
};
