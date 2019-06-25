const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const secret = require('../utils/key/secret').interface  // token 密钥

// -------------实体导入-------------
const user = require('../associate/o2o/user')


module.exports = router
router.use((req, res, next) => {
    if(req.body.ceshi) next();
    else{
        let encrp = req.body.data   // 获取已加密数据
        jwt.verify(encrp, secret, (err, dec) => {
            if (err) res.status(430).send(`接口请求参数解密失败,${err}`)
            else {
                req.body = {...dec }  //  'school_id':req.get("school_id") 
                next()
            }
        })
    }
})
// 一对一
router.use('/user', function (req, res) {
    if (req.body.judge == 0) user.findAndCountAll(req, res);
    if (req.body.judge == 1) user.findOneById(req, res);
    if (req.body.judge == 2) user.findOneByOpenId(req, res);
    if (req.body.judge == 3) user.findAndCountAllByTypeSchool(req, res);
    if (req.body.judge == 4) user.findAndCountAllBySchool(req, res);
    if (req.body.judge == 5) user.findAndCountAllByTypeLikeByNameSchool(req, res);
    if (req.body.judge == 6) user.findAndCountAllXYDS(req, res);
    if (req.body.judge == 7) user.findAndCountAllXYDSByNameSchool(req, res);
})