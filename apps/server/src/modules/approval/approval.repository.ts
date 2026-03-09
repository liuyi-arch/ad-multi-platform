/**
 * 审批数据访问层
 * 使用 Mongoose 操作 MongoDB
 */

import { ApprovalModel, IApprovalDocument } from './approval.model';

export class ApprovalRepository {
    /**
     * 创建审批记录
     */
    async create(data: Partial<IApprovalDocument>): Promise<IApprovalDocument> {
        return ApprovalModel.create(data);
    }

    /**
     * 根据广告 ID 查询审批历史
     */
    async findByAdId(adId: string): Promise<IApprovalDocument[]> {
        return ApprovalModel.find({ adId }).sort({ createdAt: -1 });
    }

    /**
     * 根据 ID 查询审批记录
     */
    async findById(id: string): Promise<IApprovalDocument | null> {
        return ApprovalModel.findById(id);
    }
}

export default new ApprovalRepository();
