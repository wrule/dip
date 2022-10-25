"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const moment_1 = __importDefault(require("moment"));
const dingtalk_1 = require("./dingtalk");
const json_data = require('./config.json');
const ding = new dingtalk_1.DingTalk({
    access_token: json_data.ACCESS_TOKEN,
    secret: json_data.SECRET,
    at_mobiles: json_data.AT_MOBILES,
});
let timer = null;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            clearTimeout(timer);
            console.log(`${(0, moment_1.default)(new Date()).format('YYYY-MM-DD HH:mm:ss')} >> 请求`);
            const rsp = yield axios_1.default.get('https://zksync2-testnet.zksync.dev');
            ding.SendMessage('zksync测试网好像可以正常访问了');
        }
        catch (e) {
            console.log(e);
        }
        finally {
            console.log(`${(0, moment_1.default)(new Date()).format('YYYY-MM-DD HH:mm:ss')} >> 响应`);
            timer = setTimeout(main, 10000);
        }
    });
}
main();
