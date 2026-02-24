/**
 * 基础 API 响应格式
 */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

/**
 * 广告状态枚举
 */
export enum AdStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  ENDING_SOON = 'ENDING_SOON'
}

/**
 * 弹窗类型定义
 */
export type ModalType =
  | 'DETAIL'
  | 'DELETE'
  | 'REJECT_ACTION'
  | 'APPROVE_ACTION'
  | 'FORM'
  | 'REJECT_REASON'
  | null;

/**
 * 核心广告对象接口
 * 整合了 admin-web 和 advertiser-web 的字段需求
 */
export interface Ad {
  id: string;
  title: string;
  description: string;
  status: AdStatus;
  bid: number;
  heat: number | string;
  publisher?: string;
  landingPage?: string;
  category?: string;
  // 以下是兼容性字段
  date?: string;           // admin-web
  createDate?: string;     // advertiser-web
  thumbnail?: string;      // admin-web
  imageUrl?: string;       // advertiser-web
  brand?: string;
  engagement?: number;
  rejectionReason?: string;
  videoUrls?: string[];
}

/**
 * 统计项定义
 */
export interface StatItem {
  label: string;
  value: string;
  trend: string;
  isPositive: boolean;
  icon: string;
  colorClass: string;
}

// 视图类型
export type ViewType = 'dashboard' | 'ad_management' | 'media' | 'analytics' | 'access' | 'GALLERY' | 'DASHBOARD';

// 为了向下兼容，保留 BaseAd 别名
export type BaseAd = Ad;

// 表单字段配置类型
export interface FormField {
  name: keyof Ad;
  label: string;
  type: string;
  required?: boolean;
  placeholder?: string;
  maxLength?: number;
  min?: number;
  step?: number | string;
  suffix?: string;
  pattern?: string;
}

// 表单配置类型
export interface FormConfig {
  fields: FormField[];
}

/**
 * 认证相关类型
 */
export type AuthRole = 'ADVERTISER' | 'ADMIN';
export type AuthMode = 'LOGIN' | 'REGISTER';
