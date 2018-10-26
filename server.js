const express=require('express');
const bodyParser=require('body-parser');
const wx_api=require('./interface/wx_api/wx_api')
const tuling_api=require('./interface/tuling_api/tuling_api')
const users=require('./interface/users/users')
const mail=require('./mail/mail')

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

server.use('/plant',function(req,res,next){    
   next();
});
server.get('/index',function(req,res){
    res.redirect('./WWW/index/index.html');   
});

server.use('/users',function(req,res){     //用户
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0)  users.login(req,res);
    if(req.query.judge==1)  users.selectAllUsers(req,res);    
    if(req.query.judge==2)  users.insertUsers(req,res);   
    if(req.query.judge==null) res.redirect('./WWW/404/QYZQ.html');
});

server.use('/mail',function(req,res){    
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0)  mail.register(req,res); 
    if(req.query.judge==null) res.redirect('./WWW/404/QYZQ.html');
})
