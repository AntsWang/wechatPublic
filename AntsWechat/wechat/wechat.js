const request = require('request');
const utils = require('../utils');
const api = {
    getAccessToken:'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential'
}
function Wechat(opts){
    this.appId = opts.wechat.appId;
    this.appSecret = opts.wechat.appSecret;
    this.readToken();
}

Wechat.prototype.readToken = function(){
    utils.readFile().then((data)=>{
        try{
            data = JSON.parse(data)
            let time = data.time,now = new Date().getTime();
            console.log(time,now,now<time)
            if(now<time){
                console.log("有效期内");
            }else{
                this.upDateToken();
            }
        }catch{
            this.upDateToken();
        }
    },function(err){
        console.log(err)
    });
}
Wechat.prototype.upDateToken = function(){
    request(api.getAccessToken+'&appid='+this.appId+'&secret='+this.appSecret, function (error, response, body) {
        let bodyObj = JSON.parse(body);
        let token = bodyObj.access_token,expires_in = bodyObj.expires_in;
        let time = new Date().getTime()+(expires_in-300)*1000,access_token = {
            token:token,
            time:time
        };
        console.log(access_token);
        utils.writeFile(JSON.stringify(access_token)).then((data)=>{
            console.log(data)
        })
 })
}
module.exports = Wechat;