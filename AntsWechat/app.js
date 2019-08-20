const Koa = require('koa');
const sha1 = require('sha1');
const config = {
    wechat:{
        appId:'wx66fbd4efb82773b2',
        appSecret:'09d4a0c4c3cf675025fd0da672d84ee7',
        token:'wangpengjie'
    }
}
const wechat = require('./wechat/g');
const app = new Koa();
app.use(wechat(config));

app.listen(1234);
console.log("Listening:1234")