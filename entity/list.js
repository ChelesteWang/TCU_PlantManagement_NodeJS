const Sequelize = require('sequelize')
const conn = require('../orm/orm').connection();

// 模型层定义
let list = conn.define(
    'list',
    {
        'id': { 'type': Sequelize.INTEGER(11), 'allowNull': true, 'primaryKey': true, 'autoIncrement': true },
        'tid': { 'type': Sequelize.INTEGER(11), 'allowNull': true },
        'card': { 'type': Sequelize.CHAR(255), 'allowNull': true },
        'x': { 'type': Sequelize.CHAR(255), 'allowNull': true },
        'y': { 'type': Sequelize.CHAR(255), 'allowNull': true },
        'lon': { 'type': Sequelize.CHAR(255), 'allowNull': true },
        'lat': { 'type': Sequelize.CHAR(255), 'allowNull': true },
        'height': { 'type': Sequelize.CHAR(255), 'allowNull': true },
        'name': { 'type': Sequelize.CHAR(255), 'allowNull': true },
        'kind_id': { 'type': Sequelize.INTEGER(11), 'allowNull': true },
        'plant_id': { 'type': Sequelize.INTEGER(11), 'allowNull': true }
    }
);

module.exports = {
    // 模型实体
    list,
    // 查询所有
    findAndCountAll(req, res) {
        list.findAndCountAll().then(msg => { res.send(msg) })
    },
    // 新建信息
    create(req, res) {
        list.create(req.body).then(msg => { res.send(msg); })
    },
    // 删除信息
    delete(req, res) {
        const { id } = req.body;
        list.destroy(
            { where: { id } }
        ).then(msg => { res.send({ "del": msg }); })
    },
    // 更新信息
    update(req, res) {
        const { id } = req.body;
        list.update(
            req.body,
            {
                where: { id }
            }).then(msg => { res.send({ "upd": msg[0] }); })
    }
};