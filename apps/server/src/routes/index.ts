import Router from 'koa-router';
import apiRoutes from './api.routes';

const router = new Router();

// 根路径
router.get('/', (ctx) => {
    ctx.body = 'Server is running!';
});

// 注册 API 路由
router.use(apiRoutes.routes(), apiRoutes.allowedMethods());

export default router;

