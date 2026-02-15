import { useState, useEffect, useCallback } from 'react';
import { Ad, AdStatus } from '@repo/shared-types';
import { adService } from '@repo/api';

/**
 * 通用的广告数据管理 Hook
 * 从 API 获取数据，支持 CRUD 操作
 */
export const useAdsData = (initialAds?: Ad[]) => {
  const [ads, setAds] = useState<Ad[]>(initialAds || []);
  const [loading, setLoading] = useState(!initialAds);
  const [error, setError] = useState<string | null>(null);

  // 从 API 获取广告列表
  const fetchAds = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await adService.getAds({ pageSize: 100 });
      setAds(result.items);
    } catch (err: any) {
      console.error('Failed to fetch ads:', err);
      setError(err.message || '获取数据失败');
      // 如果有初始数据则回退使用
      if (initialAds && ads.length === 0) {
        setAds(initialAds);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // 组件挂载时获取数据
  useEffect(() => {
    fetchAds();
  }, [fetchAds]);

  const addAd = async (payload: Partial<Ad>) => {
    try {
      const newAd = await adService.createAd(payload);
      setAds(prev => [newAd, ...prev]);
      return newAd;
    } catch (err: any) {
      console.error('Failed to create ad:', err);
      // 降级到本地操作
      const localAd: Ad = {
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
      setAds(prev => [localAd, ...prev]);
      return localAd;
    }
  };

  const updateAd = async (id: string, payload: Partial<Ad>) => {
    try {
      const updated = await adService.updateAd(id, payload);
      setAds(prev => prev.map(a => a.id === id ? { ...a, ...updated } : a));
    } catch (err: any) {
      console.error('Failed to update ad:', err);
      // 降级到本地操作
      setAds(prev => prev.map(a => a.id === id ? { ...a, ...payload } : a));
    }
  };

  const deleteAd = async (id: string) => {
    try {
      await adService.deleteAd(id);
      setAds(prev => prev.filter(a => a.id !== id));
    } catch (err: any) {
      console.error('Failed to delete ad:', err);
      // 降级到本地操作
      setAds(prev => prev.filter(a => a.id !== id));
    }
  };

  const updateAdStatus = async (id: string, status: AdStatus) => {
    try {
      const updated = await adService.updateAd(id, { status });
      setAds(prev => prev.map(a => a.id === id ? { ...a, ...updated } : a));
    } catch (err: any) {
      console.error('Failed to update ad status:', err);
      // 降级到本地操作
      setAds(prev => prev.map(a => a.id === id ? { ...a, status } : a));
    }
  };

  return {
    ads,
    setAds,
    addAd,
    updateAd,
    deleteAd,
    updateAdStatus,
    loading,
    error,
    refetch: fetchAds,
  };
};
