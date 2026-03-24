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
     * 上传视频（原有功能，保留不变）
     */
    async uploadVideo(ctx: Context) {
        // 调试日志：排查生产环境文件丢失问题
        const files = (ctx.request as any).files;
        console.log(`[Upload Debug] Header Content-Type: ${ctx.headers['content-type']}`);
        console.log(`[Upload Debug] Received File Keys: ${files ? Object.keys(files).join(', ') : 'null'}`);

        const file = files?.video;
        if (!file) {
            throw new Error('未发现视频文件');
        }
        const result = await uploadService.handleUpload(file, 'video');
        success(ctx, result, SuccessMessages.UPLOADED);
    }

    /**
     * 上传图片（原有功能，保留不变）
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
     * 批量上传（原有功能，保留不变）
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
     * 秒传检查 —— 客户端先发送文件哈希，服务端判断是否已存在
     * POST /upload/check
     * Body: { hash: string, filename: string }
     */
    async checkFile(ctx: Context) {
        const { hash } = ctx.request.body as { hash: string; filename: string };
        if (!hash) {
            ctx.status = 400;
            throw new Error('缺少文件哈希值');
        }
        const result = await uploadService.checkFileByHash(hash);
        // result: { exists, url?, uploadedChunks? }
        success(ctx, result, result.exists ? '文件已存在，秒传成功' : '文件未上传，请继续上传');
    }

    /**
     * 上传单个分片
     * POST /upload/chunk
     * FormData: chunk(file), hash, index, total, filename, type
     */
    async uploadChunk(ctx: Context) {
        const body = ctx.request.body as any;
        const files = (ctx.request as any).files;
        const chunkFile = files?.chunk;

        if (!chunkFile) throw new Error('未发现分片文件');

        const { hash, index, total, filename, type = 'video' } = body;
        if (!hash || index === undefined || !total || !filename) {
            throw new Error('缺少必要参数: hash, index, total, filename');
        }

        await uploadService.saveChunk(
            hash,
            Number(index),
            Number(total),
            filename,
            type as 'video' | 'image',
            chunkFile.filepath || chunkFile.path
        );

        success(ctx, { hash, index: Number(index), uploaded: true }, '分片上传成功');
    }

    /**
     * 合并分片，完成文件上传
     * POST /upload/merge
     * Body: { hash: string, total: number, filename: string, type: 'video' | 'image' }
     */
    async mergeChunks(ctx: Context) {
        const { hash, total, filename, type = 'video' } = ctx.request.body as any;
        if (!hash || !total || !filename) {
            throw new Error('缺少必要参数: hash, total, filename');
        }

        const result = await uploadService.mergeChunks(
            hash,
            Number(total),
            filename,
            type as 'video' | 'image'
        );

        success(ctx, result, SuccessMessages.UPLOADED);
    }

    /**
     * 删除文件（原有功能，保留不变）
     */
    async deleteFile(ctx: Context) {
        const { filename: _filename } = ctx.params;
        // TODO: 实现删除文件逻辑
        success(ctx, null, SuccessMessages.DELETED);
    }
}

export default new UploadController();
