/**
 * 认证业务逻辑层
 * 处理登录、注册等核心业务，与 HTTP 层解耦
 */

import { AuthModel } from './auth.model';
import { LoginDto, RegisterDto } from './auth.types';

/** 登录成功返回的数据结构 */
interface AuthResult {
    token: string;
    user: {
        id: string;
        phone: string;
        role: string;
    };
}

/** 自定义业务错误 */
class AuthError extends Error {
    status: number;
    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }
}

export class AuthService {
    /**
     * 用户登录
     */
    async login(dto: LoginDto): Promise<AuthResult> {
        const { phone, password, role } = dto;
        console.log(`[Auth Login Attempt] Phone: ${phone}, Role: ${role}`);

        const user = await AuthModel.findOne({ phone, role });

        if (!user) {
            console.log(`[Auth Login Failed] User not found: ${phone}`);
            throw new AuthError('用户不存在或角色不匹配', 404);
        }

        // TODO: 替换为 bcrypt 比对
        if (user.password !== password) {
            console.log(`[Auth Login Failed] Password mismatch: ${phone}`);
            throw new AuthError('密码错误', 401);
        }

        console.log(`[Auth Login Success] User: ${user.id}`);

        // TODO: 替换为真实 JWT 签发
        return {
            token: `jwt-token-${user.id}`,
            user: {
                id: user.id,
                phone: user.phone,
                role: user.role,
            },
        };
    }

    /**
     * 用户注册
     */
    async register(dto: RegisterDto): Promise<{ id: string; phone: string; role: string }> {
        const { phone, password, role } = dto;
        console.log(`[Auth Register Attempt] Phone: ${phone}, Role: ${role}`);

        const existingUser = await AuthModel.findOne({ phone, role });
        if (existingUser) {
            console.log(`[Auth Register Failed] Duplicate phone for role ${role}: ${phone}`);
            throw new AuthError('该手机号已在该角色下注册', 400);
        }

        const user = await AuthModel.create({ phone, password, role });

        console.log(`[Auth Register Success] New user ID: ${user.id}`);
        return {
            id: user.id,
            phone: user.phone,
            role: user.role,
        };
    }
}

export default new AuthService();
