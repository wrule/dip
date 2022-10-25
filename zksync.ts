import axios from 'axios';
import moment from 'moment';
import { DingTalk } from './dingtalk';
const json_data = require('./config.json');

const ding = new DingTalk({
  access_token: json_data.ACCESS_TOKEN,
  secret: json_data.SECRET,
  at_mobiles: json_data.AT_MOBILES,
});

let timer: any = null;

async function main() {
  try {
    clearTimeout(timer);
    console.log(`${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')} >> 请求`);
    const rsp = await axios.get('https://zksync2-testnet.zksync.dev');
    ding.SendMessage('zksync测试网好像可以正常访问了');
  } catch (e) {
    console.log(e);
  } finally {
    console.log(`${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')} >> 响应`);
    timer = setTimeout(main, 10000);
  }
}

main();
