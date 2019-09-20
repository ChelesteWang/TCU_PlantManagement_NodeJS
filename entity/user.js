const Sequelize = require('sequelize')
const conn = require('../orm/orm').connection();

// 模型层定义
let user = conn.define(
    'user',
    {
        'id': { 'type': Sequelize.INTEGER(11), 'allowNull': true, 'primaryKey': true, 'autoIncrement': true },
        'openid': { 'type': Sequelize.CHAR(255), 'allowNull': true },
        'sessionid': { 'type': Sequelize.CHAR(255), 'allowNull': true },
        'name': { 'type': Sequelize.CHAR(255), 'allowNull': true },
        'pass': { 'type': Sequelize.CHAR(255), 'allowNull': true },
        'stu_id': { 'type': Sequelize.CHAR(255), 'allowNull': true },
        'type': { 'type': Sequelize.INTEGER(11), 'allowNull': true },
        'mail': { 'type': Sequelize.CHAR(255), 'allowNull': true },
        'phone': { 'type': Sequelize.CHAR(255), 'allowNull': true },
        'school_id': { 'type': Sequelize.CHAR(255), 'allowNull': true },
        'condition': { 'type': Sequelize.INTEGER(11), 'allowNull': true }
    }
);

module.exports = {
    // 模型实体
    user,
    // 查询所有
    findAndCountAll(req, res) {
        user.findAndCountAll().then(msg => { res.send(msg) })
    },
    // 新建信息
    create(req, res) {
        user.create( req.body ).then(msg => { res.send(msg); })
    },
    // 删除信息
    delete(req, res) {
        const { id } = req.body;
        user.destroy(
            { where: { id } }
        ).then(msg => { res.send({ "del": msg }); })
    },
    // 更新信息
    update(req, res) {
        const { id } = req.body;
        user.update(
            req.body,
            {
                where: { id }
            }).then(msg => { res.send({ "upd": msg[0] }); })
    },
    // 登录信息
    login(req,res){
        const { pass,stu_id } = req.body;
        user.findOne(
            { where:{ stu_id,pass } }
        ).then(msg => {            
            if (msg) {
                res.send(msg)
            } else res.status(432).send("登录校验失败")
         })
    }
};