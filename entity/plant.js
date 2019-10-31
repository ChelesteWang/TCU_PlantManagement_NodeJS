const Sequelize = require('sequelize')
const conn = require('../orm/orm').connection();

// 模型层定义
let plant = conn.define(
    'plant',
    {
        'id': { 'type': Sequelize.INTEGER(11), 'allowNull': true, 'primaryKey': true, 'autoIncrement': true },
        'name': { 'type': Sequelize.CHAR(255), 'allowNull': true },
        'academic': { 'type': Sequelize.CHAR(255), 'allowNull': true },
        'alias': { 'type': Sequelize.CHAR(255), 'allowNull': true },
        'latin': { 'type': Sequelize.CHAR(255), 'allowNull': true },
        'family': { 'type': Sequelize.CHAR(255), 'allowNull': true },
        'genera': { 'type': Sequelize.CHAR(255), 'allowNull': true },
        'specie': { 'type': Sequelize.CHAR(255), 'allowNull': true },
        'morphology': { 'type': Sequelize.CHAR(255), 'allowNull': true },
        'habit': { 'type': Sequelize.CHAR(255), 'allowNull': true },
        'purpose': { 'type': Sequelize.CHAR(255), 'allowNull': true }
    }
);

module.exports = {
    // 模型实体
    plant,
    // 查询所有
    findAndCountAll(req, res) {
        plant.findAndCountAll().then(msg => { res.send(msg) })
    },
    // 按id查询
    findById(req, res) {
        
    },
    // 创建信息
    create(req, res) { plant.create(req.body).then(msg => res.send(msg)) },
    // 删除信息
    delete(req, res) {
        const { id } = req.body;
        plant.destroy(
            { where: { id } }
        ).then(msg => { res.send({ 'del': msg }); })
    },
    // 更新信息
    update(req, res) {
        const { id } = req.body;
        plant.update(
            req.body,
            { 'where': { id } }
        ).then(msg => { res.send({ "upd": msg[0] }); })
    },
    // 获取数量
    count(req, res) { plant.count().then(msg => { res.send({number:msg}) }) },
};