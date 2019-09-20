const express = require('express')
const router = express.Router()

// -------------实体导入-------------
const user = require('../associate/user')

module.exports = router

// -------------接口导出-------------
router.use((req,res,next)=>{ next(); })

// 用户&管理员
router.use('/user', function (req, res) { 
    if(req.body.judge==0) user.findAndCountAll(req,res)
    if(req.body.judge==1) user.findAndCountAllByType(req,res)
    if(req.body.judge==2) user.findOneById(req,res)
});