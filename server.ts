import Koa from 'koa';
import Router from 'koa-router';

const app = new Koa();
const router = new Router();

router.post('/ip', (ctx, next) => {
  ctx.body = 'fine';
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(18300);
