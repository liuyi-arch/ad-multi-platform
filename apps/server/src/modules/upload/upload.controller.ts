/**
 * 上传控制器
 * 处理文件上传相关的 HTTP 请求
 */

import { Context } from 'koa';
import { success } from '../../utils';
import { SuccessMessages } from '../../constants';

export class UploadController {
    /**
     * 上传视频
     */
    async uploadVideo(ctx: Context) {
        // TODO: 实现视频上传逻辑
        const file = (ctx.request as any).files?.video;
        success(ctx, { url: '/uploads/video.mp4' }, SuccessMessages.UPLOADED);
    }

    /**
     * 上传图片
     */
    async uploadImage(ctx: Context) {
        // TODO: 实现图片上传逻辑
        const file = (ctx.request as any).files?.image;
        success(ctx, { url: '/uploads/image.jpg' }, SuccessMessages.UPLOADED);
    }

    /**
     * 批量上传
     */
    async uploadMultiple(ctx: Context) {
        // TODO: 实现批量上传逻辑
        success(ctx, { urls: [] }, SuccessMessages.UPLOADED);
    }

    /**
     * 删除文件
     */
    async deleteFile(ctx: Context) {
        const { filename } = ctx.params;
        // TODO: 实现删除文件逻辑
        success(ctx, null, SuccessMessages.DELETED);
    }
}

export default new UploadController();
