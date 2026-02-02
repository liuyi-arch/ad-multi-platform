import Koa from 'koa';
import koaBody from 'koa-body';
import router from './routes';
import { errorHandler, logger, cors } from './middlewares';
import { uploadConfig } from './config';

const app = new Koa();

// 错误处理中间件 (必须在最前面)
app.use(errorHandler);

// 日志中间件
app.use(logger);

// CORS 中间件
app.use(cors);

// Body 解析中间件
app.use(koaBody({
    multipart: true,
    formidable: {
        uploadDir: uploadConfig.storage.tempDir,
        keepExtensions: true,
        maxFileSize: uploadConfig.video.maxFileSize,
    },
}));

// 路由中间件
app.use(router.routes()).use(router.allowedMethods());

export default app;

