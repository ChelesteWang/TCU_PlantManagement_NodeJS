const express = require('express')
const router = express.Router()
// -------------实体导入-------------
const wx = require('../utils/wx_api')

module.exports = router

// -------------接口导出-------------
router.use((req,res,next)=>{
    next();   
})
// 微信相关接口
router.use('/wx', (req, res)=> { 
    if(req.body.judge==0) wx.selectOpenidUnionid(req,res)
    if(req.body.judge==1) wx.selectAccessToken(req,res)
    if(req.body.judge==2) wx.sendTemplateMsg(req,res)
});