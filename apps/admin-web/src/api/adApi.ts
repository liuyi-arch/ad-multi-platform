
import { AdItem, AdStatus } from '../types/index';

/**
 * 模拟 API 调用的逻辑
 */
export const adApi = {
  fetchAds: async (): Promise<AdItem[]> => {
    // 实际项目中这里是 axios 调用
    return []; 
  },
  
  deleteAd: async (id: string): Promise<void> => {
    console.log(`Deleting ad ${id}`);
  },
  
  updateAdStatus: async (id: string, status: AdStatus): Promise<void> => {
    console.log(`Updating status for ${id} to ${status}`);
  }
};
