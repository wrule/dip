"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_router_1 = __importDefault(require("koa-router"));
const moment_1 = __importDefault(require("moment"));
const dingtalk_1 = require("./dingtalk");
const json_data = require('./config.json');
const app = new koa_1.default();
const router = new koa_router_1.default();
const ding = new dingtalk_1.DingTalk({
    access_token: json_data.ACCESS_TOKEN,
    secret: json_data.SECRET,
    at_mobiles: json_data.AT_MOBILES,
});
let ip = '未上报';
let update_time = '';
router.post('/ip', (ctx) => {
    var _a;
    const new_ip = ((_a = /(\d+.){3}\d+/.exec(ctx.ip)) === null || _a === void 0 ? void 0 : _a[0]) || 'IP解析错误';
    update_time = (0, moment_1.default)(new Date()).format('YYYY-MM-DD HH:mm:ss');
    if (new_ip !== ip) {
        ip = new_ip;
        ding.SendMessage(`[${update_time}] IP变更为: ${ip}`);
    }
    ctx.body = ip;
    console.log(`${(0, moment_1.default)(new Date()).format('YYYY-MM-DD HH:mm:ss')} >> 上报`);
});
router.get('/ip', (ctx) => {
    ctx.body = `${ip} ${update_time}`.trim();
    console.log(`${(0, moment_1.default)(new Date()).format('YYYY-MM-DD HH:mm:ss')} >> 查询`);
});
app
    .use(router.routes())
    .use(router.allowedMethods());
app.listen(18300);
