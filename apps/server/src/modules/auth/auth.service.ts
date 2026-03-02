
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { appConfig } from '../../config';
import authRepository from './auth.repository';
import { LoginDto, RegisterDto, LoginResponse, RegisterResponse, IAuthDocument } from './auth.types';
import { BusinessStatus, ErrorMessages, AUTH_CONFIG } from '../../constants';

/** 业务自定义错误封装 */
export class AuthBusinessError extends Error {
    constructor(public message: string, public code: number = BusinessStatus.FAILED) {
        super(message);
    }
}

export class AuthService {
    /**
     * 用户登录
     * @param dto 登录参数
     */
    async login(dto: LoginDto): Promise<LoginResponse> {
        const { phone, password, role } = dto;

        // 1. 查找用户
        const user = await authRepository.findByPhoneAndRole(phone, role);
        if (!user) {
            throw new AuthBusinessError(ErrorMessages.AUTH_USER_NOT_FOUND, BusinessStatus.NOT_FOUND);
        }

        // 2. 校验密码
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            throw new AuthBusinessError(ErrorMessages.AUTH_INVALID_CREDENTIALS, BusinessStatus.UNAUTHORIZED);
        }

        // 3. 签发 Token
        // jwt.sign 接受 string | number 作为 expiresIn
        const token = jwt.sign(
            { id: user.id, phone: user.phone, role: user.role },
            appConfig.jwt.secret as string,
            { expiresIn: appConfig.jwt.expiresIn as any }
        );

        return {
            token,
            user: {
                id: user.id,
                phone: user.phone,
                role: user.role,
                username: user.username,
            },
        };
    }

    /**
     * 用户注册
     * @param dto 注册参数
     */
    async register(dto: RegisterDto): Promise<RegisterResponse> {
        const { phone, password, role } = dto;

        // 1. 检查重复注册
        const existingUser = await authRepository.findByPhoneAndRole(phone, role);
        if (existingUser) {
            throw new AuthBusinessError(ErrorMessages.AUTH_DUPLICATE_PHONE, BusinessStatus.DUPLICATE);
        }

        // 2. 密码加密 (使用统一配置的哈希强度)
        const hashedPassword = await bcrypt.hash(password, AUTH_CONFIG.SALT_ROUNDS);

        // 3. 创建用户
        const user = await authRepository.create({
            ...dto,
            password: hashedPassword,
        });

        return {
            id: user.id,
            phone: user.phone,
            role: user.role,
        };
    }

    /**
     * 获取当前用户信息
     */
    async getUserById(id: string): Promise<IAuthDocument> {
        const user = await authRepository.findById(id);
        if (!user) {
            throw new AuthBusinessError(ErrorMessages.NOT_FOUND, BusinessStatus.NOT_FOUND);
        }
        return user;
    }
}

export default new AuthService();
