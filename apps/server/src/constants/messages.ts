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
    LOGIN_SUCCESS: '登录成功',
    REGISTER_SUCCESS: '注册成功',
    GET_SUCCESS: '获取成功',
    UPDATE_SUCCESS: '更新成功',
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

    // 认证相关
    AUTH_INVALID_CREDENTIALS: '密码错误',
    AUTH_USER_NOT_FOUND: '用户不存在或角色不匹配',
    AUTH_DUPLICATE_PHONE: '该手机号已在该角色下注册',
    AUTH_UNAUTHORIZED: '未登录或登录已过期',
    AUTH_TOKEN_INVALID: 'Token 无效或已过期',
} as const;

