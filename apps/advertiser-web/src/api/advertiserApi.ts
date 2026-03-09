
import { Ad } from '../types';

/**
 * 模拟广告主 API 调用
 */
export const advertiserApi = {
  saveAd: async (adData: Partial<Ad>): Promise<void> => {
    console.log('Saving ad data:', adData);
  },
  
  deleteAd: async (id: string): Promise<void> => {
    console.log('Deleting ad:', id);
  }
};
