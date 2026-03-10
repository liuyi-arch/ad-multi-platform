/**
 * 上传路由
 */

import Router from 'koa-router';
import uploadController from '../modules/upload/upload.controller';
import { authenticate } from '../middlewares';

const router = new Router(); // 移除 prefix，由父级路由指定

// ─────────── 原有路由 ───────────

// 上传视频 (需要认证)
router.post('/video', authenticate, uploadController.uploadVideo);

// 上传图片 (需要认证)
router.post('/image', authenticate, uploadController.uploadImage);

// 批量上传 (需要认证)
router.post('/multiple', authenticate, uploadController.uploadMultiple);

// 删除文件 (需要认证)
router.delete('/:filename', authenticate, uploadController.deleteFile);

// ─────────── 新增路由：大厂级上传能力 ───────────

// 秒传检查：客户端传文件 hash，服务端检查是否已存在
router.post('/check', authenticate, uploadController.checkFile);

// 分片上传：上传单个 chunk
router.post('/chunk', authenticate, uploadController.uploadChunk);

// 合并分片：所有 chunk 上传完成后触发
router.post('/merge', authenticate, uploadController.mergeChunks);

export default router;
