const sha1 = require('sha1');
const Wechat = require('./wechat');
const getRawBody = require('raw-body');
const utils = require('../utils');
module.exports = function(opts,handler){
    var wechat = new Wechat(opts)
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
            this.weixin = content.xml; //挂载消息
            yield handler.call(this,next);  //转到业务层逻辑
            wechat.replay.call(this); //真正回复
//             if(content.xml.MsgType==='event'){
//                 if(content.xml.Event==='subscribe'){
//                     this.status = 200;
//                     this.type = 'application/xml';
//                     this.body = `<xml>
//                     <ToUserName><![CDATA[${content.xml.FromUserName}]]></ToUserName>
//                     <FromUserName><![CDATA[${content.xml.ToUserName}]]></FromUserName>
//                     <CreateTime>${content.xml.CreateTime}</CreateTime>
//                     <MsgType><![CDATA[text]]></MsgType>
//                     <Content><![CDATA[你好,谢谢关注]]></Content>
//                   </xml>`
//                   return;
//                 }
//             }

//             if(content.xml.MsgType==='text'){
//                     this.status = 200;
//                     this.type = 'application/xml';
//                     this.body = `<xml>
//                     <ToUserName><![CDATA[${content.xml.FromUserName}]]></ToUserName>
//                     <FromUserName><![CDATA[${content.xml.ToUserName}]]></FromUserName>
//                     <CreateTime>${content.xml.CreateTime}</CreateTime>
//                     <MsgType><![CDATA[text]]></MsgType>
//                     <Content><![CDATA[哈哈 ${content.xml.Content}]]></Content>
//                   </xml>`
//                   return;
                
//             }

//             if(content.xml.MsgType==='image'){
//                     this.status = 200;
//                     this.type = 'application/xml';
//                     this.body = `<xml>
//                     <ToUserName><![CDATA[${content.xml.FromUserName}]]></ToUserName>
//                     <FromUserName><![CDATA[${content.xml.ToUserName}]]></FromUserName>
//                     <CreateTime>${content.xml.CreateTime}</CreateTime>
//                     <MsgType><![CDATA[image]]></MsgType>
//                     <Image>
//                     <MediaId><![CDATA[${content.xml.MediaId}]]></MediaId>
//                   </Image>
//                   </xml>`
//                   return;
            
//             }

//             if(content.xml.MsgType==='voice'){
//                 this.status = 200;
//                 this.type = 'application/xml';
//                 this.body = `<xml>
//                 <ToUserName><![CDATA[${content.xml.FromUserName}]]></ToUserName>
//                 <FromUserName><![CDATA[${content.xml.ToUserName}]]></FromUserName>
//                 <CreateTime>${content.xml.CreateTime}</CreateTime>
//                 <MsgType><![CDATA[voice]]></MsgType>
//                 <Voice>
//                 <MediaId><![CDATA[${content.xml.MediaId}]]></MediaId>
//               </Voice>
//               </xml>`
//               return;
        
//         }

//         if(content.xml.MsgType==='video'){
//             this.status = 200;
//             this.type = 'application/xml';
//             this.body = `<xml>
//             <ToUserName><![CDATA[${content.xml.FromUserName}]]></ToUserName>
//             <FromUserName><![CDATA[${content.xml.ToUserName}]]></FromUserName>
//             <CreateTime>${content.xml.CreateTime}</CreateTime>
//             <MsgType><![CDATA[video]]></MsgType>
//             <Video>
//             <MediaId><![CDATA[${content.xml.MediaId}]]></MediaId>
//             <Title><![CDATA[${content.xml.Title}]]></Title>
//             <Description><![CDATA[${content.xml.Description}]]></Description>
//           </Video>
//           </xml>`
//           return;
    
//     }

//     if(content.xml.MsgType==='music'){
//         this.status = 200;
//         this.type = 'application/xml';
//         this.body = `<xml>
//         <ToUserName><![CDATA[${content.xml.FromUserName}]]></ToUserName>
//         <FromUserName><![CDATA[${content.xml.ToUserName}]]></FromUserName>
//         <CreateTime>${content.xml.CreateTime}</CreateTime>
//         <MsgType><![CDATA[music]]></MsgType>
//         <Music>
//             <Title><![CDATA[${content.xml.Title}]]></Title>
//             <Description><![CDATA[${content.xml.Description}]]></Description>
//             <MusicUrl><![CDATA[${content.xml.MusicUrl}]]></MusicUrl>
//             <HQMusicUrl><![CDATA[${content.xml.HQMusicUrl}]]></HQMusicUrl>
//             <ThumbMediaId><![CDATA[${content.xml.ThumbMediaId}]]></ThumbMediaId>
//       </Music>
//       </xml>`
//       return;

// }

// if(content.xml.MsgType==='news'){
//     this.status = 200;
//     this.type = 'application/xml';
//     this.body = `<xml>
//     <ToUserName><![CDATA[${content.xml.FromUserName}]]></ToUserName>
//     <FromUserName><![CDATA[${content.xml.ToUserName}]]></FromUserName>
//     <CreateTime>${content.xml.CreateTime}</CreateTime>
//     <MsgType><![CDATA[news]]></MsgType>
//     <ArticleCount>${content.xml.ArticleCount}</ArticleCount>
//   <Articles>
//     <item>
//       <Title><![CDATA[${content.xml.Title}]]></Title>
//       <Description><![CDATA[${content.xml.Description}]]></Description>
//       <PicUrl><![CDATA[${content.xml.PicUrl}]]></PicUrl>
//       <Url><![CDATA[${content.xml.Url}]]></Url>
//     </item>
//   </Articles>
//   </xml>`
//   return;

// }

        }

    }
}