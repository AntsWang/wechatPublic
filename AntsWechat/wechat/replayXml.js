exports.getXml = function(content,message){
    let xml = '';
                if(content.type==='text'){
                    xml = `<xml>
                    <ToUserName><![CDATA[${message.FromUserName}]]></ToUserName>
                    <FromUserName><![CDATA[${message.ToUserName}]]></FromUserName>
                    <CreateTime>${message.CreateTime}</CreateTime>
                    <MsgType><![CDATA[text]]></MsgType>
                    <Content><![CDATA[${content.content}]]></Content>
                  </xml>`
                }
            if(content.type==='image'){
                xml = `<xml>
                    <ToUserName><![CDATA[${message.FromUserName}]]></ToUserName>
                    <FromUserName><![CDATA[${message.ToUserName}]]></FromUserName>
                    <CreateTime>${message.CreateTime}</CreateTime>
                    <MsgType><![CDATA[image]]></MsgType>
                    <Image>
                    <MediaId><![CDATA[${content.MediaId}]]></MediaId>
                  </Image>
                  </xml>`
            
            }

            if(content.type==='voice'){
                xml = `<xml>
                <ToUserName><![CDATA[${message.FromUserName}]]></ToUserName>
                <FromUserName><![CDATA[${message.ToUserName}]]></FromUserName>
                <CreateTime>${message.CreateTime}</CreateTime>
                <MsgType><![CDATA[voice]]></MsgType>
                <Voice>
                <MediaId><![CDATA[${content.MediaId}]]></MediaId>
              </Voice>
              </xml>`
        
        }

        if(content.type==='video'){
            xml = `<xml>
            <ToUserName><![CDATA[${message.FromUserName}]]></ToUserName>
            <FromUserName><![CDATA[${message.ToUserName}]]></FromUserName>
            <CreateTime>${message.CreateTime}</CreateTime>
            <MsgType><![CDATA[video]]></MsgType>
            <Video>
            <MediaId><![CDATA[${content.MediaId}]]></MediaId>
            <Title><![CDATA[${content.Title}]]></Title>
            <Description><![CDATA[${content.Description}]]></Description>
          </Video>
          </xml>`
    
    }

    if(content.type==='music'){
        xml = `<xml>
        <ToUserName><![CDATA[${message.FromUserName}]]></ToUserName>
        <FromUserName><![CDATA[${message.ToUserName}]]></FromUserName>
        <CreateTime>${message.CreateTime}</CreateTime>
        <MsgType><![CDATA[music]]></MsgType>
        <Music>
            <Title><![CDATA[${content.Title}]]></Title>
            <Description><![CDATA[${content.Description}]]></Description>
            <MusicUrl><![CDATA[${content.MusicUrl}]]></MusicUrl>
            <HQMusicUrl><![CDATA[${content.HQMusicUrl}]]></HQMusicUrl>
            <ThumbMediaId><![CDATA[${content.ThumbMediaId}]]></ThumbMediaId>
      </Music>
      </xml>`

}

if(content.type==='news'){
    xml = `<xml>
    <ToUserName><![CDATA[${message.FromUserName}]]></ToUserName>
    <FromUserName><![CDATA[${message.ToUserName}]]></FromUserName>
    <CreateTime>${message.CreateTime}</CreateTime>
    <MsgType><![CDATA[news]]></MsgType>
    <ArticleCount>${message.ArticleCount}</ArticleCount>
  <Articles>
    <item>
      <Title><![CDATA[${content.Title}]]></Title>
      <Description><![CDATA[${content.Description}]]></Description>
      <PicUrl><![CDATA[${content.PicUrl}]]></PicUrl>
      <Url><![CDATA[${content.Url}]]></Url>
    </item>
  </Articles>
  </xml>`

}
return xml;
}