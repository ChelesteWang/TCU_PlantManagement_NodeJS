const express = require('express')
const router = express.Router()

// -------------实体导入-------------
const user = require('../associate/user')
const list = require('../associate/list')
const kind = require('../associate/kind')
const plant = require('../associate/plant')
const protect = require('../associate/protect')
const photo = require('../associate/photo')
const callback = require('../associate/callback')

module.exports = router

// -------------接口导出-------------
router.use((req,res,next)=>{ next(); })

// 用户&管理员
router.use('/user', function (req, res) { 
    if(req.body.judge==0) user.findAndCountAll(req,res)
    if(req.body.judge==1) user.findAndCountAllByType(req,res)
    if(req.body.judge==2) user.findOneById(req,res)
});
// 植物信息
router.use('/list', function (req, res) { 
    if(req.body.judge==0) list.findAndCountAll(req,res)
    if(req.body.judge==1) list.findOneById(req,res)
    if(req.body.judge==2) list.findAndCountAllByName(req,res)
    if(req.body.judge==3) list.findAndCountAllByKind(req,res)
});
// 类别信息
router.use('/kind', function (req, res) { 
    if(req.body.judge==0) kind.findAndCountAll(req,res)
});
// 种类信息
router.use('/plant', function (req, res) { 
    if(req.body.judge==0) plant.findAndCountAll(req,res)
});
// 养护信息
router.use('/protect', function (req, res) { 
    if(req.body.judge==0) protect.findAndCountAll(req,res)
});
// 校园风景
router.use('/photo', function (req, res) { 
    if(req.body.judge==0) photo.findAndCountAll(req,res)
});
// 用户&管理员
router.use('/callback', function (req, res) { 
    if(req.body.judge==0) callback.findAndCountAll(req,res)
    if(req.body.judge==1) callback.findOneById(req,res)
});