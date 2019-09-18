const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer')
// 工具
const log = require('./log/log')
const file = require('./utils/upload')
// 路由
const entity = require('./route/entity')

var server = express();

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json())
server.use(express.static(__dirname));
server.use(log.log4js.connectLogger(log.loggerExpress))

var objmulter = multer({ dest: "./www/upload" });    //dest指定上传文件地址
server.use(objmulter.any());

server.use( async(req, res, next) => {
    // 允许所有请求
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin", "X-Requested-With", "Content-Type", "Accept" ,"Authorization");
    next();
});

// 加载外部router
server.use('/ent', entity);
server.use('/upload', (req, res) => { file.upload(req, res); })

// 监听端口
server.listen(11111);