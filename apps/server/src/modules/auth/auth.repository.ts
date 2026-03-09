/**
 * 认证数据访问层 (Repository)
 * 封装 Mongoose 操作，提供给 Service 层使用
 */

import { AuthModel } from './auth.model';
import { RegisterDto, IAuthDocument } from './auth.types';
import { AuthRole } from '@repo/shared-types';

export class AuthRepository {
    /**
     * 根据手机号和角色查找用户
     */
    async findByPhoneAndRole(phone: string, role: AuthRole): Promise<IAuthDocument | null> {
        return AuthModel.findOne({ phone, role });
    }

    /**
     * 根据 ID 查找用户
     */
    async findById(id: string): Promise<IAuthDocument | null> {
        return AuthModel.findById(id);
    }

    /**
     * 创建新用户
     */
    async create(dto: RegisterDto): Promise<IAuthDocument> {
        return AuthModel.create(dto);
    }

    /**
     * TODO: 更新用户信息 (待扩展)
     */
}

export default new AuthRepository();
