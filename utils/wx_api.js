const request = require('request');

// 一个方便的 log 方法
const log = console.log.bind(console)

module.exports = {
    //查询用户 openid unionid
    selectOpenidUnionid(req, res) {
        const { appid,secret,grant_type,js_code } = req.body
        // 参考链接：https://developers.weixin.qq.com/miniprogram/dev/api/api-login.html
        var url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&grant_type=${grant_type}&js_code=${js_code}`;
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) res.send(body);
            else res.send(error);
        });
    },

    //查询用户 access_token
    selectAccessToken(req, res) {
        const { appid,secret } = req.body
        // 参考链接：https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
        var url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`;
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) res.send(body);
            else res.send(error);
        });
    },

    //发送模板消息
    sendTemplateMsg(req, res) {
        var access_token = req.body.access_token;
        var data = req.body.data;
        // 参考链接：https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=ACCESS_TOKEN
        var url = `https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=${access_token}`;
        request({
            url: url,
            method: "POST",
            json: true,
            headers: {
                "content-type": "application/json",
            },
            body: JSON.parse(data)
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) res.send(body);
            else res.send(error);
        });
    }
}