/**
 * 上传路由
 */

import Router from 'koa-router';
import uploadController from '../modules/upload/upload.controller';
import { authenticate } from '../middlewares';

const router = new Router({ prefix: '/upload' });

// 上传视频 (需要认证)
router.post('/video', authenticate, uploadController.uploadVideo);

// 上传图片 (需要认证)
router.post('/image', authenticate, uploadController.uploadImage);

// 批量上传 (需要认证)
router.post('/multiple', authenticate, uploadController.uploadMultiple);

// 删除文件 (需要认证)
router.delete('/:filename', authenticate, uploadController.deleteFile);

export default router;
