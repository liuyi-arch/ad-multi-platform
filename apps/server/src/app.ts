import Koa from 'koa';
import koaBody from 'koa-body';
import serve from 'koa-static';
import mount from 'koa-mount';
import range from 'koa-range';
import path from 'path';
import router from './routes';
import { errorHandler, logger, cors } from './middlewares';
import { uploadConfig } from './config';

const app = new Koa();

// 错误处理中间件 (必须在最前面)
app.use(errorHandler);

// 日志中间件
app.use(logger);

// 处理 favicon.ico 404
app.use(async (ctx, next) => {
    if (ctx.path === '/favicon.ico') {
        ctx.status = 204;
        return;
    }
    await next();
});

// 支持 Range 请求 (必须在 static/mount 之前)
app.use(range);

// CORS 中间件
app.use(cors);

// 静态文件服务 (将 /uploads 映射到 uploads 目录)
app.use(mount('/uploads', serve(path.join(process.cwd(), 'uploads'))));

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

