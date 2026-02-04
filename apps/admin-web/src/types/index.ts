
export enum AdStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  ENDING_SOON = 'ENDING_SOON'
}

/* Definition for modal state types used across the application */
export type ModalType = 'DETAIL' | 'DELETE' | 'REJECT_ACTION' | 'APPROVE_ACTION' | 'FORM' | 'REJECT_REASON' | null;

export interface AdItem {
  id: string;
  title: string;
  description: string;
  status: AdStatus;
  bid: number;
  heat: string;
  date: string;
  thumbnail: string;
  category?: string;
  brand?: string;
  engagement?: number;
  publisher?: string;
  landingPage?: string;
}

export interface StatItem {
  label: string;
  value: string;
  trend: string;
  isPositive: boolean;
  icon: string;
  colorClass: string;
}

export type ViewType = 'dashboard' | 'ad_management' | 'media' | 'analytics' | 'access';
