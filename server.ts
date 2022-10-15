import Koa from 'koa';
import Router from 'koa-router';
import moment from 'moment';
import fs from 'fs';

const app = new Koa();
const router = new Router();

const file_name = 'ip.txt';

router.post('/ip', (ctx) => {
  try {
    fs.writeFileSync(
      file_name,
      `${ctx.ip} ${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}`,
      'utf-8',
    );
  } catch (e) {
    console.error(e);
  } finally {
    ctx.body = '好的';
  }
});

router.get('/ip', (ctx) => {
  let result = '暂无上报';
  try {
    result = fs.readFileSync(file_name, 'utf-8');
  } catch (e) {
    console.error(e);
  }
  ctx.body = result;
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(18300);
