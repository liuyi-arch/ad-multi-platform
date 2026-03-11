/**
 * 文件处理工具
 * 用于文件上传、删除、重命名等操作
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import { uploadConfig } from '../config';

/**
 * 确保目录存在
 */
export const ensureDir = async (dirPath: string): Promise<void> => {
    try {
        await fs.access(dirPath);
    } catch {
        await fs.mkdir(dirPath, { recursive: true });
    }
};

/**
 * 保存文件
 */
export const saveFile = async (
    file: Buffer,
    filename: string,
    subDir: string = ''
): Promise<string> => {
    const uploadDir = path.join(uploadConfig.storage.uploadDir, subDir);
    await ensureDir(uploadDir);

    const filePath = path.join(uploadDir, filename);
    await fs.writeFile(filePath, file);

    return filePath;
};

/**
 * 移动文件 (从临时目录到正式目录)
 */
export const moveFile = async (
    tempPath: string,
    filename: string,
    subDir: string = ''
): Promise<string> => {
    const uploadDir = path.join(uploadConfig.storage.uploadDir, subDir);
    await ensureDir(uploadDir);

    const targetPath = path.join(uploadDir, filename);

    try {
        // 首先尝试重命名 (跨分区可能失败)
        await fs.rename(tempPath, targetPath);
    } catch (err: any) {
        if (err.code === 'EXDEV') {
            // 跨分区错误：回退到复制 + 删除逻辑
            await fs.copyFile(tempPath, targetPath);
            await fs.unlink(tempPath);
        } else {
            throw err;
        }
    }

    return `${uploadConfig.storage.staticPath}/${subDir ? subDir + '/' : ''}${filename}`;
};

/**
 * 删除文件
 */
export const deleteFile = async (filePath: string): Promise<void> => {
    try {
        await fs.unlink(filePath);
    } catch (err) {
        console.error('Failed to delete file:', err);
    }
};

/**
 * 生成唯一文件名
 */
export const generateFilename = (originalName: string): string => {
    const ext = path.extname(originalName);
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    return `${timestamp}-${random}${ext}`;
};

/**
 * 获取文件扩展名
 */
export const getFileExtension = (filename: string): string => {
    return path.extname(filename).toLowerCase();
};

/**
 * 验证文件类型
 */
export const isValidFileType = (
    mimeType: string,
    allowedTypes: string[]
): boolean => {
    return allowedTypes.includes(mimeType);
};

/**
 * 验证文件大小
 */
export const isValidFileSize = (size: number, maxSize: number): boolean => {
    return size <= maxSize;
};
