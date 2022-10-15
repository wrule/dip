import Koa from 'koa';
import Router from 'koa-router';
import moment from 'moment';
import fs from 'fs';

const app = new Koa();
const router = new Router();

const file_name = 'ip.txt';

router.post('/ip', (ctx) => {
  ctx.body = 'fine';
});

router.get('/ip', (ctx) => {
  try {
    ctx.body = fs.readFileSync(file_name, 'utf-8');
  } catch (e) {
    console.error(e);
  } finally {
    ctx.body = '暂无上报';
  }
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(18300);
