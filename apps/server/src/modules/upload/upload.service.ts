/**
 * 上传业务逻辑层
 */

import { generateFilename, moveFile, deleteFile } from '../../utils';

export class UploadService {
    /**
     * 处理文件上传
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
     * 删除文件
     */
    async deleteFile(filename: string) {
        // TODO: 实现文件删除逻辑
        await deleteFile(filename);
        return true;
    }
}

export default new UploadService();
