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
exports.DingTalk = void 0;
const axios_1 = __importDefault(require("axios"));
const crypto_1 = __importDefault(require("crypto"));
class DingTalk {
    constructor(config) {
        this.config = config;
    }
    SendMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const timestamp = Number(new Date());
            const sign_string = `${timestamp}\n${this.config.secret}`;
            const sign = encodeURIComponent(crypto_1.default
                .createHmac('sha256', this.config.secret)
                .update(sign_string)
                .digest('base64'));
            yield axios_1.default.post('https://oapi.dingtalk.com/robot/send', {
                msgtype: 'text',
                text: {
                    content: message,
                },
                at: {
                    atMobiles: this.config.at_mobiles,
                    isAtAll: false,
                },
            }, {
                params: {
                    access_token: this.config.access_token,
                    timestamp,
                    sign,
                },
            });
        });
    }
}
exports.DingTalk = DingTalk;
