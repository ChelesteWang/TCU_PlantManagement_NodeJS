const express = require('express')
const router = express.Router()

// -------------实体导入-------------
const plant = require('../entity/plant');
const kind = require('../entity/kind');
const list = require('../entity/list');
const user = require('../entity/user');
const info = require('../entity/info');
const protect = require('../entity/protect');
const photo = require('../entity/photo');
const callback = require('../entity/callback');

module.exports = router

// -------------接口导出-------------
router.use((req,res,next)=>{ next(); })

// 植物信息
router.use('/plant', function (req, res) { 
    if(req.body.judge==0) plant.findAndCountAll(req,res)
    if(req.body.judge==1) plant.create(req,res)
    if(req.body.judge==2) plant.delete(req,res)
    if(req.body.judge==3) plant.update(req,res)
    if(req.body.judge==4) plant.findById(req,res)
    if(req.body.judge==5) plant.count(req,res)
});
// 植物类型
router.use('/kind', function (req, res) {
    if(req.body.judge==0) kind.findAndCountAll(req,res)
    if(req.body.judge==1) kind.create(req,res)
    if(req.body.judge==2) kind.delete(req,res)
    if(req.body.judge==3) kind.update(req,res)
});
// 卡片信息
router.use('/list', function (req, res) {
    if(req.body.judge==0) list.findAndCountAll(req,res)
    if(req.body.judge==1) list.create(req,res)
    if(req.body.judge==2) list.delete(req,res)
    if(req.body.judge==3) list.update(req,res)
    if(req.body.judge==4) list.findByRand(req,res)
    if(req.body.judge==5) list.creatCard(req,res)
    if(req.body.judge==6) list.count(req,res)
});
// 用户信息
router.use('/user', function (req, res) {
    if(req.body.judge==0) user.findAndCountAll(req,res)
    if(req.body.judge==1) user.create(req,res)
    if(req.body.judge==2) user.delete(req,res)
    if(req.body.judge==3) user.update(req,res)
    if(req.body.judge==4) user.login(req,res)
});
// 微信信息
router.use('/info', function (req, res) {
    if(req.body.judge==0) info.findAndCountAll(req,res)
    if(req.body.judge==1) info.create(req,res)
    if(req.body.judge==2) info.delete(req,res)
    if(req.body.judge==3) info.update(req,res)
});
// 养护管理
router.use('/protect', function (req, res) {
    if(req.body.judge==0) protect.findAndCountAll(req,res)
    if(req.body.judge==1) protect.create(req,res)
    if(req.body.judge==2) protect.delete(req,res)
    if(req.body.judge==3) protect.update(req,res)
    if(req.body.judge==4) protect.count(req,res)
});
// 养护管理
router.use('/photo', function (req, res) {
    if(req.body.judge==0) photo.findAndCountAll(req,res)
    if(req.body.judge==1) photo.create(req,res)
    if(req.body.judge==2) photo.delete(req,res)
    if(req.body.judge==3) photo.update(req,res)
    if(req.body.judge==4) photo.count(req,res)
});
// 用户信息
router.use('/callback', function (req, res) {
    if(req.body.judge==0) callback.findAndCountAll(req,res)
    if(req.body.judge==1) callback.create(req,res)
    if(req.body.judge==2) callback.delete(req,res)
    if(req.body.judge==3) callback.update(req,res)
});