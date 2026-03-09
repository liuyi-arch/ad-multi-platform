import { 
  Ad as SharedAd, 
  AdStatus as SharedAdStatus, 
  ModalType as SharedModalType,
  ViewType as SharedViewType
} from '@repo/shared-types';

export { SharedAdStatus as AdStatus };
export type { SharedAd as Ad };
export type { SharedModalType as ModalType };
export type ViewType = SharedViewType;
