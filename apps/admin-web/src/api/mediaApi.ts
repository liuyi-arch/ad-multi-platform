
import { MediaItem } from '../types';

/**
 * 模拟获取媒体资源列表
 */
export const fetchMediaItems = async (): Promise<MediaItem[]> => {
  return Array.from({ length: 8 }, (_, i) => ({
    id: i,
    url: `https://picsum.photos/seed/media${i}/400/225`,
    name: `素材_${i + 1}.mp4`,
    size: '12.4 MB',
    type: i % 2 === 0 ? 'video' : 'image'
  }));
};
