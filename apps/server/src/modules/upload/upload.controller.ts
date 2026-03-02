/**
 * 上传控制器
 * 处理文件上传相关的 HTTP 请求
 */

import { Context } from 'koa';
import { success } from '../../utils';
import { SuccessMessages } from '../../constants';
import uploadService from './upload.service';

export class UploadController {
    /**
     * 上传视频
     */
    async uploadVideo(ctx: Context) {
        const file = (ctx.request as any).files?.video;
        if (!file) {
            throw new Error('未发现视频文件');
        }
        const result = await uploadService.handleUpload(file, 'video');
        success(ctx, result, SuccessMessages.UPLOADED);
    }

    /**
     * 上传图片
     */
    async uploadImage(ctx: Context) {
        const file = (ctx.request as any).files?.image;
        if (!file) {
            throw new Error('未发现图片文件');
        }
        const result = await uploadService.handleUpload(file, 'image');
        success(ctx, result, SuccessMessages.UPLOADED);
    }

    /**
     * 批量上传
     */
    async uploadMultiple(ctx: Context) {
        const files = (ctx.request as any).files;
        if (!files) {
            throw new Error('未发现上传文件');
        }

        const results = [];
        const fileList = Array.isArray(files.files) ? files.files : [files.files];

        for (const file of fileList) {
            if (file) {
                const res = await uploadService.handleUpload(file, 'image');
                results.push(res);
            }
        }

        success(ctx, { urls: results.map(r => r.url), details: results }, SuccessMessages.UPLOADED);
    }

    /**
     * 删除文件
     */
    async deleteFile(ctx: Context) {
        const { filename: _filename } = ctx.params;
        // TODO: 实现删除文件逻辑
        success(ctx, null, SuccessMessages.DELETED);
    }
}

export default new UploadController();
