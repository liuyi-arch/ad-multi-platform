/**
 * 状态码常量
 * 定义 HTTP 状态码和业务状态码
 */

// HTTP 状态码
export const HttpStatus = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
} as const;

// 业务状态码
export const BusinessStatus = {
    SUCCESS: 0,
    FAILED: 1,
    VALIDATION_ERROR: 1001,
    UNAUTHORIZED: 1002,
    FORBIDDEN: 1003,
    NOT_FOUND: 1004,
    DUPLICATE: 1005,
} as const;

// 广告状态
export const AdStatus = {
    DRAFT: 'DRAFT',           // 草稿
    PENDING: 'PENDING',       // 待审核
    APPROVED: 'APPROVED',     // 已通过
    REJECTED: 'REJECTED',     // 已驳回
    PUBLISHED: 'PUBLISHED',   // 已发布
    ARCHIVED: 'ARCHIVED',     // 已归档
} as const;

// 审批状态
export const ApprovalStatus = {
    PENDING: 'PENDING',       // 待审批
    APPROVED: 'APPROVED',     // 已通过
    REJECTED: 'REJECTED',     // 已驳回
} as const;

// 上传状态
export const UploadStatus = {
    PENDING: 'PENDING',       // 等待上传
    UPLOADING: 'UPLOADING',   // 上传中
    SUCCESS: 'SUCCESS',       // 上传成功
    FAILED: 'FAILED',         // 上传失败
} as const;
