const Koa = require('koa');
const sha1 = require('sha1');
const weixin = require('./weixin');
const config = {
    wechat: {
        appId: 'wxe12e9516cf5344b8',//
        appSecret: '8906babb961841f54af680d82823ba64',
        token: 'wangpengjie'
    }
}
const g = require('./wechat/g');
const app = new Koa();
app.use(g(config, weixin.reply));

app.listen(8080);
console.log("Listening:8080")