const Sequelize = require('sequelize')
const conn = require('../orm/orm').connection();

// 模型层定义
let callback = conn.define(
    'callback',
    {
        'id': { 'type': Sequelize.INTEGER(11), 'allowNull': true, 'primaryKey': true, 'autoIncrement': true },
        'user_id': { 'type': Sequelize.INTEGER(11), 'allowNull': true },
        'callback': { 'type': Sequelize.CHAR(255), 'allowNull': true }
    }
);

module.exports = {
    // 模型实体
    callback,
    // 查询所有
    findAndCountAll(req, res) {
        callback.findAndCountAll().then(msg => { res.send(msg) })
    },
    // 新建信息
    create(req, res) {
        callback.create(req.body).then(msg => { res.send(msg); })
    },
    // 删除信息
    delete(req, res) {
        const { id } = req.body;
        callback.destroy(
            { where: { id } }
        ).then(msg => { res.send({ "del": msg }); })
    },
    // 更新信息
    update(req, res) {
        const { id } = req.body;
        callback.update(
            req.body,
            {
                where: { id }
            }).then(msg => { res.send({ "upd": msg[0] }); })
    }
};