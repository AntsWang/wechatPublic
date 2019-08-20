const sha1 = require('sha1');
const Wechat = require('./wechat');
const getRawBody = require('raw-body');
const utils = require('../utils');
module.exports = function(opts){
    new Wechat(opts)
    return function *(next){
        console.log(1111111,this.query);
        var token = opts.wechat.token;
        var signature = this.query.signature;
        var timestamp = this.query.timestamp;
        var nonce = this.query.nonce;
        var echostr = this.query.echostr;
        var sortStr = [token,timestamp,nonce].sort().join("");
        var shaStr = sha1(sortStr);
        if(this.method==='GET'){
            if(shaStr===signature){
                this.body = echostr;
            }else{
                this.body='wrong'
            }
        }else if(this.method==='POST'){
            if(shaStr!==signature){
                this.body = "wrong";
                return false;
            }
            var data = yield getRawBody(this.req,{
                length:this.length,
                limit:'1mb',
                encoding:this.charset
            })
            console.log(data.toString());
            var content = yield utils.xmlToJs(data.toString());
            console.log(content);
        }

    }
}