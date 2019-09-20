const Sequelize = require('sequelize')
const conn = require('../orm/orm').connection();

// 模型层定义
let info = conn.define(
    'info',
    {
        'id': { 'type': Sequelize.INTEGER(11), 'allowNull': true, 'primaryKey': true, 'autoIncrement': true },
        'user_id': { 'type': Sequelize.INTEGER(11), 'allowNull': true },
        'nickName': { 'type': Sequelize.CHAR(255), 'allowNull': true },
        'avatarUrl': { 'type': Sequelize.CHAR(255), 'allowNull': true },
        'gender': { 'type': Sequelize.INTEGER(11), 'allowNull': true },
        'province': { 'type': Sequelize.CHAR(255), 'allowNull': true },
        'city': { 'type': Sequelize.CHAR(255), 'allowNull': true },
        'country': { 'type': Sequelize.CHAR(255), 'allowNull': true }
    }
);

module.exports = {
    // 模型实体
    info,
    // 查询所有
    findAndCountAll(req, res) {
        info.findAndCountAll().then(msg => { res.send(msg) })
    },
    // 新建信息
    create(req, res) {
        info.create( req.body ).then(msg => { res.send(msg); })
    },
    // 删除信息
    delete(req, res) {
        const { id } = req.body;
        info.destroy(
            { where: { id } }
        ).then(msg => { res.send({ "del": msg }); })
    },
    // 更新信息
    update(req, res) {
        const { id } = req.body;
        info.update(
            req.body,
            {
                where: { id }
            }).then(msg => { res.send({ "upd": msg[0] }); })
    }
};