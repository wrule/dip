import Koa from 'koa';
import Router from 'koa-router';
import moment from 'moment';
import { DingTalk } from './dingtalk';
const json_data = require('./config.json');

const app = new Koa();
const router = new Router();
const ding = new DingTalk({
  access_token: json_data.ACCESS_TOKEN,
  secret: json_data.SECRET,
  at_mobiles: json_data.AT_MOBILES,
});

let ip = '未上报';
let update_time = '';

router.post('/ip', (ctx) => {
  console.log(`${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')} >> 上报`);
  const new_ip = /(\d+.){3}\d+/.exec(ctx.ip)?.[0] || 'IP解析错误';
  update_time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
  if (new_ip !== ip) {
    ip = new_ip;
    ding.SendMessage(`[${update_time}] IP变更为: ${ip}`);
  }
  ctx.body = ip;
});

router.get('/ip', (ctx) => ctx.body = `${ip} ${update_time}`.trim());

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(18300);
