/**
 * 认证 Mongoose Model
 */

import mongoose, { Schema } from 'mongoose';

import { IAuthDocument } from './auth.types';

const AuthSchema = new Schema<IAuthDocument>(
    {
        username: { type: String, trim: true },
        phone: { type: String, required: true, trim: true },
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

// 索引：手机号 + 角色 联合唯一，允许一个手机号在不同角色下注册
AuthSchema.index({ phone: 1, role: 1 }, { unique: true });

export const AuthModel = mongoose.model<IAuthDocument>('Auth', AuthSchema);
