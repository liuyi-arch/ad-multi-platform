/**
 * 用户 Mongoose Model
 */

import mongoose, { Schema, Document } from 'mongoose';

export interface IUserDocument extends Document {
    username?: string;
    phone: string;
    password: string;
    role: 'ADVERTISER' | 'ADMIN';
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<IUserDocument>(
    {
        username: { type: String, trim: true },
        phone: { type: String, required: true, unique: true, trim: true },
        password: { type: String, required: true },
        role: {
            type: String,
            enum: ['ADVERTISER', 'ADMIN'],
            default: 'ADVERTISER'
        },
    },
    {
        timestamps: true,
        toJSON: {
            transform(_doc, ret) {
                const { _id, __v, password, ...rest } = ret;
                return { id: _id.toString(), ...rest };
            },
        },
    }
);

// 索引
UserSchema.index({ phone: 1 }, { unique: true });

export const UserModel = mongoose.model<IUserDocument>('User', UserSchema);
