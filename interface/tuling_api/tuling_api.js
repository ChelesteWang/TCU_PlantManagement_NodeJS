var request = require('request');
module.exports={

    //tuling_api
    sendTulingMsg:function(req,res){
        function sel(req,res){        
            var data=req.query.data; 
            var url="http://openapi.tuling123.com/openapi/api/v2";
            fun(url,data,res);
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
                    //console.log(body)                            // 请求成功的处理逻辑
                    res.send(body)
                }
            });
        }
        sel(req,res);
    }

}
