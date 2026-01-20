import Koa from 'koa';
import router from './routes';

const app = new Koa();

// Basic middleware
app.use(async (ctx, next) => {
    console.log(`${ctx.method} ${ctx.url}`);
    await next();
});

app.use(router.routes()).use(router.allowedMethods());

export default app;
