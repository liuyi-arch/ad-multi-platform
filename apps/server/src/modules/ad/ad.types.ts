/**
 * 广告类型定义
 */

import { AdStatus } from '../../constants';

export interface Ad {
    id: string;
    title: string;
    description: string;
    publisher: string;
    imageUrl?: string;
    videoUrls?: string[];
    landingPage?: string;
    bid: number;
    heat: number;
    status: typeof AdStatus[keyof typeof AdStatus];
    category: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateAdDto {
    title: string;
    description: string;
    publisher: string;
    imageUrl?: string;
    videoUrls?: string[];
    landingPage?: string;
    bid: number;
    category: string;
}

export interface UpdateAdDto extends Partial<CreateAdDto> { }
