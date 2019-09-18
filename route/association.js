const express = require('express')
const router = express.Router()

// -------------实体导入-------------
const plant = require('../entity/plant')

module.exports = router

// -------------接口导出-------------
router.use((req,res,next)=>{ next(); })

// 用户&管理员
router.use('/plant', function (req, res) { 
    if(req.body.judge==0) plant.findAndCountAll(req,res)
    if(req.body.judge==1) plant.create(req,res)
    if(req.body.judge==2) plant.delete(req,res)
    if(req.body.judge==3) plant.update(req,res)
});