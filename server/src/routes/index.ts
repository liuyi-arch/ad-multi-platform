import Router from 'koa-router';

const router = new Router();

router.get('/', (ctx) => {
    ctx.body = 'Server is running!';
});

router.get('/api/health', (ctx) => {
    ctx.body = { status: 'ok' };
});

export default router;
