/**
 * 广告 Mongoose Model
 * 定义广告文档的 Schema 和数据模型
 */

import mongoose, { Schema, Document } from 'mongoose';

export interface IAdDocument extends Document {
    title: string;
    description: string;
    status: string;
    bid: number;
    heat: number;
    publisher?: string;
    landingPage?: string;
    category?: string;
    imageUrl?: string;
    thumbnail?: string;
    brand?: string;
    engagement?: number;
    rejectionReason?: string;
    videoUrls?: string[];
    date?: string;
    createDate?: string;
    createdAt: Date;
    updatedAt: Date;
}

const AdSchema = new Schema<IAdDocument>(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        status: {
            type: String,
            enum: ['PENDING', 'APPROVED', 'REJECTED', 'ENDING_SOON', 'DRAFT', 'PUBLISHED', 'ARCHIVED'],
            default: 'PENDING',
        },
        bid: { type: Number, required: true, min: 0 },
        heat: { type: Number, default: 0 },
        publisher: { type: String, trim: true },
        landingPage: { type: String, trim: true },
        category: { type: String, trim: true },
        imageUrl: { type: String, trim: true },
        thumbnail: { type: String, trim: true },
        brand: { type: String, trim: true },
        engagement: { type: Number, default: 0 },
        rejectionReason: { type: String, trim: true },
        videoUrls: { type: [String], default: [] },
        date: { type: String },
        createDate: { type: String },
    },
    {
        timestamps: true,
        toJSON: {
            // 将 _id 映射为 id，移除 __v
            transform(_doc, ret) {
                const { _id, __v, ...rest } = ret;
                return { id: _id.toString(), ...rest };
            },
        },
    }
);

// 索引
AdSchema.index({ status: 1 });
AdSchema.index({ category: 1 });
AdSchema.index({ title: 'text', description: 'text' });

export const AdModel = mongoose.model<IAdDocument>('Ad', AdSchema);
