import { 
  Ad as SharedAd, 
  AdStatus as SharedAdStatus, 
  ModalType as SharedModalType,
  StatItem as SharedStatItem,
  ViewType as SharedViewType
} from '@repo/shared-types';

export { SharedAdStatus as AdStatus };
export type { SharedModalType as ModalType };
export type { SharedAd as AdItem };
export type { SharedStatItem as StatItem };

export interface User {
  name: string;
  role: string;
  email: string;
  status: '在线' | '离线';
}

export interface MediaItem {
  id: number;
  url: string;
  name: string;
  size: string;
  type: 'video' | 'image';
}

export type ViewType = SharedViewType;
