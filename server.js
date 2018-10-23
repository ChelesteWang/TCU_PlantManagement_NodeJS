const express=require('express');
const bodyParser=require('body-parser');
const wx_api=require('./interface/wx_api/wx_api')
const tuling_api=require('./interface/tuling_api/tuling_api')

var server=express();
server.listen(11111);

process.on('uncaughtException', function (err) {
    //打印出错误
    console.log(err);
    //打印出错误的调用栈方便调试
    console.log(err.stack);
  });

server.use(bodyParser.urlencoded({extended:false}));
server.use(express.static(__dirname));

server.use('/',function(req,res,next){
   next();
});
server.get('/index',function(req,res){
    res.redirect('./WWW/index/index.html');   
});

server.use('/wx_api',function(req,res){        //前台调用，返还wx_api data
    if(req.query.judge==0)  wx_api.selectOpenidUnionid(req,res);
    if(req.query.judge==1)  wx_api.selectAccessToken(req,res);
    if(req.query.judge==3)  wx_api.sendTemplateMsg(req,res);
    if(req.query.judge==null) res.redirect('./WWW/404/QYZQ.html');
});

server.use('/tuling_api',function(req,res){
    if(req.query.judge==1)  tuling_api.sendTulingMsg(req,res);
    if(req.query.judge==null) res.redirect('./WWW/404/QYZQ.html');
});
