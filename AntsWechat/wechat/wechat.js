const request = require('request');
const utils = require('../utils');
const replayXml = require('./replayXml');
const menu = require('../config/menu');
const api = {
    getAccessToken: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential',
    crateMenu:'https://api.weixin.qq.com/cgi-bin/menu/create?access_token=',//post
    deleteMenu:'https://api.weixin.qq.com/cgi-bin/menu/delete?access_token=',
    queryMenu:'https://api.weixin.qq.com/cgi-bin/get_current_selfmenu_info?access_token='
}
function Wechat(opts) {
    this.appId = opts.wechat.appId;
    this.appSecret = opts.wechat.appSecret;
    this.readToken();
}

Wechat.prototype.readToken = function () {
    return new Promise(function (resolve, reject) {
        utils.readFile().then((data) => {
            try {
                data = JSON.parse(data)
                let time = data.time, now = new Date().getTime();
                if (now < time) {
                    resolve(data.token);
                } else {
                    this.upDateToken();
                }
            } catch{
                this.upDateToken();
            }
        }, function (err) {
            console.log(err)
        });
    })
}
Wechat.prototype.upDateToken = function () {
    return new Promise(function (resolve,reject) {
        request(api.getAccessToken + '&appid=' + this.appId + '&secret=' + this.appSecret, function (error, response, body) {
            let bodyObj = JSON.parse(body);
            let token = bodyObj.access_token, expires_in = bodyObj.expires_in;
            let time = new Date().getTime() + (expires_in - 300) * 1000, access_token = {
                token: token,
                time: time
            };
            resolve(token);
            utils.writeFile(JSON.stringify(access_token)).then((data) => {

            })
        })
    })
}

Wechat.prototype.replay = function () {
    var content = this.body;
    var message = this.weixin;
console.log(content,'body');
    var xml = replayXml.getXml(content, message);

    this.status = 200;
    this.type = 'application/xml';
    this.body = xml;
}
Wechat.prototype.createMenu = function () {
    let that = this;
    return new Promise(function(){
        that.readToken().then(function(data){
            request({
                url: api.crateMenu+data,
                method: "POST",
                json: true,
                headers: {
                    "content-type": "application/json",
                },
                body: menu
            }, function (error, response, body) {
                if(body.errcode==0){

                }else{
                    console.log(body)
                    throw new Error('create menu failed');
                }

            })
    
        });
    })

}
Wechat.prototype.deleteMenu = function () {
    let that = this;
    return new Promise(function(){
        that.readToken().then(function(data){
            request(api.deleteMenu+data, function (error, response, body) {
                if(body.errcode==0){

                }else{
                    throw new Error('delete menu failed');
                }

            })
    
        });
    })

}
module.exports = Wechat;