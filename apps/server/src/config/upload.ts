/**
 * 文件上传配置
 * 定义文件上传的限制和存储路径
 */

export const uploadConfig = {
    // 视频上传配置
    video: {
        // 允许的文件类型
        allowedMimeTypes: ['video/mp4', 'video/quicktime', 'video/x-msvideo'],
        // 允许的文件扩展名
        allowedExtensions: ['.mp4', '.mov', '.avi'],
        // 最大文件大小 (100MB)
        maxFileSize: 100 * 1024 * 1024,
        // 最大上传数量
        maxFiles: 3,
    },

    // 图片上传配置
    image: {
        allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
        allowedExtensions: ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
        maxFileSize: 10 * 1024 * 1024, // 10MB
        maxFiles: 10,
    },

    // 存储路径配置
    storage: {
        // 上传文件存储目录
        uploadDir: process.env.UPLOAD_DIR || './uploads',
        // 临时文件目录
        tempDir: process.env.TEMP_DIR || './temp',
        // 静态文件访问路径
        staticPath: '/uploads',
    },

    // 分片上传配置 (用于大文件)
    chunk: {
        // 是否启用分片上传
        enabled: true,
        // 分片大小 (5MB)
        chunkSize: 5 * 1024 * 1024,
    },
};
