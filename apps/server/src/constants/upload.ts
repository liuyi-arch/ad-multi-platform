/**
 * 上传相关常量
 */

// 文件类型映射
export const MimeTypeMap = {
    // 视频
    'video/mp4': '.mp4',
    'video/quicktime': '.mov',
    'video/x-msvideo': '.avi',

    // 图片
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/gif': '.gif',
    'image/webp': '.webp',
} as const;

// 文件大小限制 (字节)
export const FileSizeLimit = {
    VIDEO: 100 * 1024 * 1024,  // 100MB
    IMAGE: 10 * 1024 * 1024,   // 10MB
} as const;

// 文件数量限制
export const FileCountLimit = {
    VIDEO: 3,
    IMAGE: 10,
} as const;
