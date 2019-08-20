const fs = require("fs");
const xmltojs  = require('xml2js');
function formatMessage(data){
        var keys = Object.keys(),obj = {};
        for(let i = 0;i<keys.length;i++){
                if(data[keys[i]] instanceof Array && data[keys[i]].length==1){
                         obj[keys[i]] =data[keys[i]][0] 
                }else if(typeof data[keys[i]] =='object'){
                    obj[keys[i]] = formatMessage(data[keys[i]])
                }else{
                    obj[keys[i]] = data[keys[i]]||''
                }
        }
        return obj;
}
exports.readFile =  function(){
    return new Promise(function(resolve,reject){
        fs.readFile("./config/access_token.txt", (err, data) => {
            if ( !err ) {
                resolve(data)
            }else{
                reject(err)
            }
        })
    })

}

exports.writeFile =  function(data){
    return new Promise(function(resolve,reject){
        fs.writeFile("./config/access_token.txt",data, (err, data) => {
            if ( !err ) {
                resolve(data)
            }else{
                reject(err)
            }
        })
    })

}

exports.xmlToJs = function(xml){
    return new Promise(function(resolve,reject){
        xmltojs.parseString(xml,function(err,content){
            if(err) reject(err);
            let con = formatMessage(content);
            console.log(con)
            resolve(con)
        })
    })
}