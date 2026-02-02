/**
 * 审批类型定义
 */

import { ApprovalStatus } from '../../constants';

export interface Approval {
    id: string;
    adId: string;
    approverId: string;
    status: typeof ApprovalStatus[keyof typeof ApprovalStatus];
    reason?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ApproveDto {
    adId: string;
    approverId: string;
}

export interface RejectDto {
    adId: string;
    approverId: string;
    reason: string;
}
