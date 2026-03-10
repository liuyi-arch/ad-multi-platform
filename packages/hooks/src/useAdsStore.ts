import { create } from 'zustand';
import { Ad, AdStatus } from '@repo/shared-types';
import { adService } from '@repo/api';
import { formatPrice, formatHeat } from '@repo/utils';

interface AdsState {
  ads: Ad[];
  loading: boolean;
  error: string | null;
  lastFetched: number | null;

  // Actions
  setAds: (ads: Ad[]) => void;
  fetchAds: (force?: boolean) => Promise<void>;
  addAd: (payload: Partial<Ad>) => Promise<Ad | null>;
  updateAd: (id: string, payload: Partial<Ad>) => Promise<void>;
  deleteAd: (id: string) => Promise<void>;
  updateAdStatus: (id: string, status: AdStatus) => Promise<void>;
  incrementHeat: (id: string) => Promise<void>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // WebSocket 同步动作
  syncActions: {
    handleCreated: (ad: Ad) => void;
    handleUpdated: (ad: Ad) => void;
    handleDeleted: (id: string) => void;
  };
}

/**
 * 统一的数据格式化逻辑，处理金额和热度的显示
 */
const formatAd = (ad: Ad): Ad => {
  // 将 bid 转换为纯数字：处理 "¥100.00" 已格式化字符串、纯数字字符串、以及原生 number
  const rawBid = ad.bid as any;
  let numericBid: number;
  if (typeof rawBid === 'number') {
    numericBid = rawBid;
  } else if (typeof rawBid === 'string') {
    numericBid = parseFloat(String(rawBid).replace(/[¥,]/g, '')) || 0;
  } else {
    numericBid = 0;
  }
  return {
    ...ad,
    bid: formatPrice(numericBid) as any,
    heat: formatHeat(ad.heat) as any,
  };
};

/**
 * 广告数据管理 Store
 * 处理广告的获取、增删改查及状态同步
 */
export const useAdsStore = create<AdsState>((set, get) => ({
  ads: [],
  loading: false,
  error: null,
  lastFetched: null,

  /**
   * 手动设置广告列表
   */
  setAds: (ads) => set({ ads: ads.map(formatAd), lastFetched: Date.now() }),

  /**
   * 从服务器获取广告列表
   * @param force 是否强制刷新（忽略缓存时间）
   */
  fetchAds: async (force = false) => {
    const { lastFetched, loading } = get();
    if (!force && lastFetched && Date.now() - lastFetched < 5 * 60 * 1000) {
      return;
    }
    if (loading) return;

    set({ loading: true, error: null });
    try {
      const response = await adService.getAds({ pageSize: 100 });
      const items = Array.isArray(response?.items) ? response.items : [];
      set({
        ads: items.map(formatAd),
        loading: false,
        lastFetched: Date.now()
      });
    } catch (err: any) {
      set({ error: err.message || '获取广告失败', loading: false });
    }
  },

  /**
   * 创建新广告
   */
  addAd: async (payload) => {
    try {
      const newAd = await adService.createAd(payload);
      const formattedAd = formatAd(newAd);
      set((state) => ({ ads: [formattedAd, ...state.ads] }));
      return formattedAd;
    } catch (err: any) {
      console.error('Failed to create ad:', err);
      return null;
    }
  },

  /**
   * 更新现有广告
   */
  updateAd: async (id, payload) => {
    try {
      const updated = await adService.updateAd(id, payload);
      const formattedAd = formatAd(updated);
      set((state) => ({
        ads: state.ads.map((ad) => (ad.id === id ? formattedAd : ad))
      }));
    } catch (err: any) {
      console.error('Failed to update ad:', err);
    }
  },

  /**
   * 删除广告
   */
  deleteAd: async (id) => {
    try {
      await adService.deleteAd(id);
      set((state) => ({
        ads: state.ads.filter((ad) => ad.id !== id)
      }));
    } catch (err: any) {
      console.error('Failed to delete ad:', err);
    }
  },

  /**
   * 更新广告审核状态
   */
  updateAdStatus: async (id, status) => {
    try {
      const updated = await adService.updateAd(id, { status });
      const formattedAd = formatAd(updated);
      set((state) => ({
        ads: state.ads.map((ad) => (ad.id === id ? formattedAd : ad))
      }));
    } catch (err: any) {
      console.error('Failed to update status:', err);
    }
  },

  /**
   * 增加广告曝光热度
   */
  incrementHeat: async (id) => {
    try {
      const updated = await adService.incrementHeat(id);
      const formattedAd = formatAd(updated);
      set((state) => ({
        ads: state.ads.map((ad) => (ad.id === id ? formattedAd : ad))
      }));
    } catch (err: any) {
      console.error('Failed to increment heat:', err);
    }
  },

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  /**
   * WebSocket 同步动作对象
   */
  syncActions: {
    handleCreated: (ad) => {
      const formattedAd = formatAd(ad);
      set((state) => {
        // 避免重复添加（可能同时由 API 响应和 WS 消息触发）
        if (state.ads.some(a => a.id === formattedAd.id)) return state;
        return { ads: [formattedAd, ...state.ads] };
      });
    },

    handleUpdated: (ad) => {
      const formattedAd = formatAd(ad);
      set((state) => ({
        ads: state.ads.map((a) => (a.id === formattedAd.id ? formattedAd : a))
      }));
    },

    handleDeleted: (id) => {
      set((state) => ({
        ads: state.ads.filter((a) => a.id !== id)
      }));
    }
  }
}));
