/**
 * 认证控制器
 */

import { Context } from 'koa';
import { success, error } from '../../utils';
import { AuthModel } from './auth.model';
import { LoginDto, RegisterDto } from './auth.types';

export class AuthController {
    /**
     * 用户登录
     */
    async login(ctx: Context) {
        const { phone, password, role } = ctx.request.body as LoginDto;
        console.log(`[Auth Login Attempt] Phone: ${phone}, Role: ${role}`);

        const user = await AuthModel.findOne({ phone, role });

        if (!user) {
            console.log(`[Auth Login Failed] User not found: ${phone}`);
            return error(ctx, 404, '用户不存在或角色不匹配');
        }

        // 简化的密码校验
        if (user.password !== password) {
            console.log(`[Auth Login Failed] Password mismatch: ${phone}`);
            return error(ctx, 401, '密码错误');
        }

        console.log(`[Auth Login Success] User: ${user.id}`);
        success(ctx, {
            token: `jwt-token-${user.id}`,
            user: {
                id: user.id,
                phone: user.phone,
                role: user.role
            }
        }, '登录成功');
    }

    /**
     * 用户注册
     */
    async register(ctx: Context) {
        const { phone, password, role } = ctx.request.body as RegisterDto;
        console.log(`[Auth Register Attempt] Phone: ${phone}, Role: ${role}`);

        // 校验重复注册
        try {
            const existingUser = await AuthModel.findOne({ phone, role }); // 同角色手机号唯一
            if (existingUser) {
                console.log(`[Auth Register Failed] Duplicate phone for role ${role}: ${phone}`);
                return error(ctx, 400, '该手机号已在该角色下注册');
            }

            const user = await AuthModel.create({
                phone,
                password,
                role
            });

            console.log(`[Auth Register Success] New user ID: ${user.id}`);
            success(ctx, {
                id: user.id,
                phone: user.phone,
                role: user.role
            }, '注册成功');
        } catch (err: any) {
            console.error(`[Auth Register Error]`, err);
            error(ctx, 500, err.message || '注册失败');
        }
    }

    /**
     * 获取当前用户信息
     */
    async getCurrentUser(ctx: Context) {
        success(ctx, {}, '获取成功');
    }

    /**
     * 更新用户信息
     */
    async updateProfile(ctx: Context) {
        const data = ctx.request.body;
        success(ctx, data, '更新成功');
    }
}

export default new AuthController();
