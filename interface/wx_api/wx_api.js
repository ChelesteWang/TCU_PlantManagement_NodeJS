var request = require('request');
module.exports={

    //查询用户 openid_unionid
    selectOpenidUnionid:function(req,res){
        function sel(req,res){            
            var appid=req.query.appid;     
            var secret=req.query.secret;     
            var grant_type=req.query.grant_type;     
            var js_code=req.query.js_code;    
            // 参考链接：https://developers.weixin.qq.com/miniprogram/dev/api/api-login.html
            var url=`https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&grant_type=${grant_type}&js_code=${js_code}`;
            fun(url,appid);
        }
        function fun(url,appid) {
            request(url,function(error,response,body){
                if(!error && response.statusCode == 200){
                    //输出返回的内容
                    //console.log("appid --->",appid);
                    res.send(body);
                }
            });
        }
        sel(req,res);
    },
    
    //查询用户 access_token
    selectAccessToken:function(req,res){
        function sel(req,res){            
            var appid=req.query.appid;     
            var secret=req.query.secret;     
            var grant_type=req.query.grant_type;     
            var js_code=req.query.js_code;    
            // 参考链接：https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
            var url=`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`;
            fun(url,appid);
        }
        function fun(url,appid) {
            request(url,function(error,response,body){
                if(!error && response.statusCode == 200){
                    //输出返回的内容
                    //console.log("appid --->",appid);
                    res.send(body);
                }
            });
        }
        sel(req,res);
    },
    
    //发送模板消息
    sendTemplateMsg:function(req,res){
        function sel(req,res){     
            var access_token=req.query.access_token;       
            var data=req.query.data;
            // 参考链接：https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=ACCESS_TOKEN
            var url=`https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=${access_token}`;
            fun(url,data,res);
            //console.log(url,data)
        }
        function fun(url,data,res) {
            request({
                url: url,
                method: "POST",
                json: true,
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.parse(data)
            }, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(body) // 请求成功的处理逻辑
                    res.send(body)
                }
            });
        }
        sel(req,res);
    }


}
