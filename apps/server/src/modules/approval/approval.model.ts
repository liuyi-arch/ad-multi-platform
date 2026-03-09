/**
 * 审批 Mongoose Model
 * 定义审批记录文档的 Schema 和数据模型
 */

import mongoose, { Schema, Document } from 'mongoose';

export interface IApprovalDocument extends Document {
    adId: string;
    approverId: string;
    status: string;
    reason?: string;
    createdAt: Date;
    updatedAt: Date;
}

const ApprovalSchema = new Schema<IApprovalDocument>(
    {
        adId: { type: String, required: true, index: true },
        approverId: { type: String, required: true },
        status: {
            type: String,
            enum: ['PENDING', 'APPROVED', 'REJECTED'],
            default: 'PENDING',
        },
        reason: { type: String, trim: true },
    },
    {
        timestamps: true,
        toJSON: {
            transform(_doc, ret: any) {
                ret.id = ret._id.toString();
                delete ret._id;
                delete ret.__v;
                return ret;
            },
        },
    }
);

ApprovalSchema.index({ adId: 1, createdAt: -1 });

export const ApprovalModel = mongoose.model<IApprovalDocument>('Approval', ApprovalSchema);
