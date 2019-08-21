exports.reply = function* (next){
    var message = this.weixin;
    console.log(message,22222)
    if(message.MsgType === 'event'){
        if(message.Event === 'subscribe'){
            if(message.EventKey) console.log('扫描二维码关注：'+message.EventKey+' '+message.ticket);
            let content = {
                type:'text',
                content:'终于等到你，还好我没放弃'
            }
            this.body = content;
        }else if(message.Event === 'unsubscribe'){
            let content = {
                type:'text',
                content:'悄悄地溜走了？'
            }
            this.body = content;
        }
    }else if(message.MsgType === 'image'){
        let content = {
            type:'image',
            MediaId:message.MediaId
        }
        this.body = content;
    }else if(message.MsgType === 'voice'){
        let content = {
            type:'voice',
            MediaId:message.MediaId
        }
        this.body = content;
    }else if(message.MsgType === 'video'){
        let content = {
            type:'text',
            content:'悄悄地溜走了？'
        }
        this.body = content;
    }else if(message.MsgType === 'shortvideo'){
        let content = {
            type:'text',
            content:'悄悄地溜走了？'
        }
        this.body = content;
    }else if(message.MsgType === 'location'){
        let content = {
            type:'text',
            content:'悄悄地溜走了？'
        }
        this.body = content;
    }else{
        let content = {
            type:'text',
            content:'你说：'+message.Content
        }
        this.body = content;
        //
    }

    yield next;
}