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
}

// 统一的数据格式化逻辑
const formatAd = (ad: Ad): Ad => ({
  ...ad,
  bid: formatPrice(ad.bid as any as number) as any,
  heat: formatHeat(ad.heat) as any
});

export const useAdsStore = create<AdsState>((set, get) => ({
  ads: [],
  loading: false,
  error: null,
  lastFetched: null,

  setAds: (ads) => set({ ads: ads.map(formatAd), lastFetched: Date.now() }),
  
  fetchAds: async (force = false) => {
    const { lastFetched, loading } = get();
    if (!force && lastFetched && Date.now() - lastFetched < 5 * 60 * 1000) {
      return;
    }
    if (loading) return;

    set({ loading: true, error: null });
    try {
      const response = await adService.getAds({ pageSize: 100 });
      // 这里的 response 是 PaginatedResponse<Ad> 类型
      set({ 
        ads: response.items.map(formatAd), 
        loading: false, 
        lastFetched: Date.now() 
      });
    } catch (err: any) {
      set({ error: err.message || '获取广告失败', loading: false });
    }
  },

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
}));
