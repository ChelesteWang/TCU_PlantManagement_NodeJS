const express=require('express');
const bodyParser=require('body-parser');
const multer=require('multer');
const fs=require('fs');
const path=require('path');
const wx_api=require('./interface/wx_api/wx_api')
const tuling_api=require('./interface/tuling_api/tuling_api')
const users=require('./interface/users/users')
const file=require('./interface/file/file')
const plants=require('./interface/plants/plants')
const mail=require('./mail/mail')

var objmulter=multer({dest:"./www/upload"});    //dest指定上传文件地址
var pathlib=path;

var server=express();
server.use(bodyParser.urlencoded({extended:false}));
server.use(objmulter.any());
server.use(express.static(__dirname));
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
    res.redirect('./WWW/cs.html');   
});

server.use('/users',function(req,res){     //用户
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0)  users.login(req,res);
    if(req.query.judge==1)  users.selectAllUsers(req,res);    
    if(req.query.judge==2)  users.insertUsers(req,res);     
    if(req.query.judge==3)  users.selectUsersByEmail(req,res);  
    if(req.query.judge==4)  users.updateUserPassword(req,res);   
    if(req.query.judge==null) res.redirect('./WWW/404/QYZQ.html');
});

server.use('/mail',function(req,res){    
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0)  mail.register(req,res); 
    if(req.query.judge==null) res.redirect('./WWW/404/QYZQ.html');
})

server.post('/UploadServlet',function(req,res){     //获取前台用户上传的头像订单
    res.setHeader("Access-Control-Allow-Origin", "*");    
    if(req.query.judge==0)  file.uploadFile(req,res,pathlib,fs);  
});

server.use('/plants',function(req,res){     //用户
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0)  plants.selectAllPlants(req,res);  
    if(req.query.judge==1)  plants.insertPlants(req,res);  
    if(req.query.judge==2)  plants.selectPlantById(req,res);  
    if(req.query.judge==3)  plants.updatePlantInfo(req,res);  
    if(req.query.judge==null) res.redirect('./WWW/404/QYZQ.html');
});
