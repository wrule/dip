import axios from 'axios';
import moment from 'moment';
const json_data = require('./url.json');

let timer: any = null;

async function main() {
  try {
    clearTimeout(timer);
    console.log(`${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')} >> 请求`);
    await axios.post(json_data.url);
  } catch (e) {
    console.log(e);
  } finally {
    console.log(`${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')} >> 响应`);
    timer = setTimeout(main, 10000);
  }
}

main();
