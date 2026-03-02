import { Document } from 'mongoose';
import { AuthRole } from '@repo/shared-types';

export interface IAuthDocument extends Document {
    username?: string;
    phone: string;
    password: string;
    role: AuthRole;
    createdAt: Date;
    updatedAt: Date;
}

export interface LoginDto {
    phone: string;
    password: string;
    role: AuthRole;
}

export interface RegisterDto {
    phone: string;
    password: string;
    role: AuthRole;
    username?: string;
}

export interface LoginResponse {
    token: string;
    user: {
        id: string;
        phone: string;
        role: AuthRole;
        username?: string;
        avatar?: string;
    };
}

export interface RegisterResponse {
    id: string;
    phone: string;
    role: AuthRole;
}
