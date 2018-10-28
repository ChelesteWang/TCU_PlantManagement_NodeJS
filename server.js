const express=require('express');
const bodyParser=require('body-parser');
const multer=require('multer');
const fs=require('fs');
const path=require('path');
const wx_api=require('./interface/wx_api/wx_api')
const tuling_api=require('./interface/tuling_api/tuling_api')
const users=require('./interface/users/users')
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

server.post('/UploadServlet',function(req,res){     //获取前台用户上传的头像订单
    console.log(req.files);
    //获取原始文件扩展名
    var newName=req.files[0].path+pathlib.parse(req.files[0].originalname).ext;
    console.log(pathlib.parse(req.files[0].originalname).ext);      //输出文件后缀
    console.log("--->",newName);
    fs.rename(req.files[0].path,newName,function(err){
        if(err){
            console.log("上传失败");
            res.send(JSON.parse(`{ "file upload success ?": "flase" }`))
        }else{
            console.log("上传成功");
            res.send(JSON.parse(`{ "file upload success ?": "true" ,"filename":"${newName}"}`))
        }
    })
});
