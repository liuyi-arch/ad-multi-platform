/**
 * 校验文件大小
 * @param file 文件对象
 * @param maxSize 最大字节数 (默认 100MB)
 * @returns 错误信息或 null
 */
export const validateFileSize = (file: File, maxSize: number = 100 * 1024 * 1024): string | null => {
  if (file.size > maxSize) {
    const sizeInMB = (maxSize / (1024 * 1024)).toFixed(0);
    return `文件 ${file.name} 超过 ${sizeInMB}MB`;
  }
  return null;
};

/**
 * 校验文件类型
 * @param file 文件对象
 * @param allowedTypes 允许的 MIME 类型数组
 * @returns 错误信息或 null
 */
export const validateFileType = (file: File, allowedTypes: string[]): string | null => {
  if (!allowedTypes.includes(file.type)) {
    const typesStr = allowedTypes.map(t => t.split('/')[1].toUpperCase()).join(', ');
    return `文件 ${file.name} 格式不支持（仅支持 ${typesStr}）`;
  }
  return null;
};

/**
 * 生成随机 ID
 * @param length 长度
 * @returns 随机字符串
 */
export const genId = (length: number = 7): string => {
  return Math.random().toString(36).substring(2, 2 + length);
};
