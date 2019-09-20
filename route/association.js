const express = require('express')
const router = express.Router()

// -------------实体导入-------------
const user = require('../associate/user')
const list = require('../associate/list')

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
});