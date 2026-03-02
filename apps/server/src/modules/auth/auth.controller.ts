
import { Context } from 'koa';
import { success } from '../../utils';
import authService from './auth.service';
import { LoginSchema, RegisterSchema } from './auth.schema';
import { SuccessMessages, ErrorMessages } from '../../constants';
import { ExtendedContext } from '../../types';

export class AuthController {
    /**
     * 用户登录
     */
    async login(ctx: Context) {
        // 运行时校验，拦截安全隐患 (ZodError 将被全局中间件捕获)
        const dto = LoginSchema.parse(ctx.request.body);
        const result = await authService.login(dto);
        success(ctx, result, SuccessMessages.LOGIN_SUCCESS);
    }

    /**
     * 用户注册
     */
    async register(ctx: Context) {
        // 运行时校验
        const dto = RegisterSchema.parse(ctx.request.body);
        const result = await authService.register(dto);
        success(ctx, result, SuccessMessages.REGISTER_SUCCESS);
    }

    /**
     * 获取当前用户信息
     */
    async getCurrentUser(ctx: ExtendedContext) {
        if (!ctx.user) {
            // 业务异常由全局中间件统一处理
            throw new Error(ErrorMessages.AUTH_UNAUTHORIZED);
        }
        const user = await authService.getUserById(ctx.user.id);
        success(ctx, user, SuccessMessages.GET_SUCCESS);
    }

    /**
     * 更新用户信息
     */
    async updateProfile(ctx: ExtendedContext) {
        // TODO: 实现更新逻辑
        const data = ctx.request.body;
        success(ctx, data, SuccessMessages.UPDATE_SUCCESS);
    }
}

export default new AuthController();
