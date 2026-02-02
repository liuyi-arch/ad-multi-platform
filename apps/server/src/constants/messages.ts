/**
 * 消息常量
 * 定义系统中使用的各种提示消息
 */

// 成功消息
export const SuccessMessages = {
    CREATED: '创建成功',
    UPDATED: '更新成功',
    DELETED: '删除成功',
    UPLOADED: '上传成功',
    APPROVED: '审批通过',
    REJECTED: '已驳回',
} as const;

// 错误消息
export const ErrorMessages = {
    INTERNAL_ERROR: '服务器内部错误',
    NOT_FOUND: '资源不存在',
    UNAUTHORIZED: '未授权访问',
    FORBIDDEN: '无权限访问',
    VALIDATION_ERROR: '数据验证失败',
    DUPLICATE: '资源已存在',

    // 上传相关
    FILE_TOO_LARGE: '文件大小超过限制',
    INVALID_FILE_TYPE: '不支持的文件类型',
    UPLOAD_FAILED: '文件上传失败',
    MAX_FILES_EXCEEDED: '超过最大文件数量限制',

    // 广告相关
    AD_NOT_FOUND: '广告不存在',
    AD_ALREADY_APPROVED: '广告已审批,无法修改',

    // 审批相关
    APPROVAL_NOT_FOUND: '审批记录不存在',
    ALREADY_APPROVED: '已审批,无法重复操作',
} as const;

// 验证消息
export const ValidationMessages = {
    REQUIRED: '此字段为必填项',
    INVALID_EMAIL: '邮箱格式不正确',
    INVALID_URL: 'URL 格式不正确',
    MIN_LENGTH: '长度不能少于 {min} 个字符',
    MAX_LENGTH: '长度不能超过 {max} 个字符',
    MIN_VALUE: '值不能小于 {min}',
    MAX_VALUE: '值不能大于 {max}',
} as const;
