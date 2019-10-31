const Sequelize = require('sequelize')
const conn = require('../orm/orm').connection();

// 模型层定义
let protect = conn.define(
    'protect',
    {
        'id': { 'type': Sequelize.INTEGER(11), 'allowNull': true, 'primaryKey': true, 'autoIncrement': true },
        'title': { 'type': Sequelize.CHAR(255), 'allowNull': true },
        'admin': { 'type': Sequelize.CHAR(255), 'allowNull': true },
        'detail': { 'type': Sequelize.CHAR(255), 'allowNull': true },
        'condition': { 'type': Sequelize.CHAR(255), 'allowNull': true }
    }
);

module.exports = {
    // 模型实体
    protect,
    // 查询所有
    findAndCountAll(req, res) {
        protect.findAndCountAll().then(msg => { res.send(msg) })
    },
    // 新建信息
    create(req, res) {
        protect.create(req.body).then(msg => { res.send(msg); })
    },
    // 删除信息
    delete(req, res) {
        const { id } = req.body;
        protect.destroy(
            { where: { id } }
        ).then(msg => { res.send({ "del": msg }); })
    },
    // 更新信息
    update(req, res) {
        const { id, name } = req.body;
        protect.update(
            req.body,
            {
                where: { id }
            }).then(msg => { res.send({ "upd": msg[0] }); })
    },
    // 获取数量
    count(req, res) { protect.count().then(msg => { res.send({number:msg}) }) },
};