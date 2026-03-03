/**
 * 上传业务逻辑层
 */

import * as fs from 'fs/promises';
import * as fss from 'fs';
import * as path from 'path';
import { generateFilename, moveFile, deleteFile, ensureDir } from '../../utils';
import { uploadStore } from './upload.store';
import { uploadConfig } from '../../config';

export class UploadService {
    /**
     * 处理文件上传（原有功能，保留不变）
     */
    async handleUpload(file: any, type: 'video' | 'image') {
        // 从临时路径移动到正式路径
        const originalName = file.originalFilename || file.name || 'file';
        const filename = generateFilename(originalName);
        const url = await moveFile(file.filepath || file.path, filename, type);

        return {
            url,
            filename,
            size: file.size,
            mimeType: file.mimetype || file.type,
        };
    }

    /**
     * 秒传检查 —— 根据文件哈希判断服务端是否已有该文件
     */
    async checkFileByHash(hash: string): Promise<{ exists: boolean; url?: string; uploadedChunks?: number[] }> {
        const existingUrl = uploadStore.getUrlByHash(hash);
        if (existingUrl) {
            return { exists: true, url: existingUrl };
        }

        // 若无完整文件，返回已上传的分片（断点续传）
        const uploadedChunks = uploadStore.getUploadedChunks(hash);
        return { exists: false, uploadedChunks };
    }

    /**
     * 保存单个分片到临时目录
     */
    async saveChunk(
        hash: string,
        index: number,
        total: number,
        filename: string,
        type: 'video' | 'image',
        chunkFilePath: string  // formidable 写入的临时文件路径
    ): Promise<void> {
        const chunkDir = path.join(uploadConfig.storage.tempDir, 'chunks', hash);
        await ensureDir(chunkDir);

        const chunkPath = path.join(chunkDir, `${index}`);
        await fs.rename(chunkFilePath, chunkPath);

        // 初始化并记录进度
        uploadStore.initChunkRecord(hash, total, filename, type);
        uploadStore.markChunkUploaded(hash, index);
    }

    /**
     * 合并所有分片 —— 用于完成分片上传或断点续传最终步骤
     */
    async mergeChunks(
        hash: string,
        total: number,
        originalFilename: string,
        type: 'video' | 'image'
    ): Promise<{ url: string; filename: string }> {
        const chunkDir = path.join(uploadConfig.storage.tempDir, 'chunks', hash);
        const ext = path.extname(originalFilename);
        const filename = generateFilename(originalFilename);
        const uploadDir = path.join(uploadConfig.storage.uploadDir, type);
        await ensureDir(uploadDir);

        const targetPath = path.join(uploadDir, filename);
        const writeStream = fss.createWriteStream(targetPath);

        // 按序拼合所有分片
        for (let i = 0; i < total; i++) {
            const chunkPath = path.join(chunkDir, `${i}`);
            const chunkData = await fs.readFile(chunkPath);
            await new Promise<void>((resolve, reject) => {
                writeStream.write(chunkData, (err) => {
                    if (err) reject(err);
                    else resolve();
                });
            });
        }

        await new Promise<void>((resolve, reject) => {
            writeStream.end((err?: Error | null) => {
                if (err) reject(err);
                else resolve();
            });
        });

        // 清理分片临时目录
        await fs.rm(chunkDir, { recursive: true, force: true });

        const url = `${uploadConfig.storage.staticPath}/${type}/${filename}`;

        // 注册哈希，下次同文件可秒传
        uploadStore.registerHash(hash, url);
        uploadStore.deleteChunkRecord(hash);

        return { url, filename };
    }

    /**
     * 删除文件
     */
    async deleteFile(filename: string) {
        // TODO: 实现文件删除逻辑
        await deleteFile(filename);
        return true;
    }
}

export default new UploadService();
