/**
 * 上传类型定义
 */

export interface UploadedFile {
    url: string;
    filename: string;
    size: number;
    mimeType: string;
    uploadedAt: Date;
}

export interface UploadOptions {
    maxSize?: number;
    allowedTypes?: string[];
}
