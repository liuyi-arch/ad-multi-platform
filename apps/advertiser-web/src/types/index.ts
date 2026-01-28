
export enum AdStatus {
  APPROVED = 'APPROVED',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED'
}

export interface Ad {
  id: string;
  title: string;
  publisher: string;
  description: string;
  bid: number;
  heat: number;
  status: AdStatus;
  createDate: string;
  imageUrl: string;
  category: string;
  landingPage: string;
  rejectionReason?: string;
}

export type ViewType = 'GALLERY' | 'DASHBOARD';
