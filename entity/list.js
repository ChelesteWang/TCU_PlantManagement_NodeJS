const Sequelize = require('sequelize')
const conn = require('../orm/orm').connection();

var co = require('co');  //yield
const qr = require('qr-image')
const fs = require('fs')

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
    },
    // 随机取值
    findByRand(req, res){
        const { number } = req.body;
        conn.query(`select lon,lat from lists order by rand() limit ${number};`)
        .then(msg => { res.send(msg)})
    },
    // 生成树牌
    creatCard(req, res){
        list.findAll({
            attributes:['id','tid','card','name']
        }).then(msg => {
            console.log(msg[0].dataValues)
            // let code = qr.image(JSON.stringify({ version:'1.0.0', ...msg.dataValues}), { type: 'png' })
            // code.pipe(fs.createWriteStream(`./card/${msg.dataValues.id}-${msg.dataValues.card}.png`))
            for(let item of msg){
                let code = qr.image(JSON.stringify({ type:'tcu_tree',version:'1.0.0', ...item.dataValues}), { type: 'png' })
                code.pipe(fs.createWriteStream(`./card/${item.dataValues.id}_${item.dataValues.card}.png`))
            }
            res.send(msg)
        })
    },
    // 获取数量
    count(req, res) { list.count().then(msg => { res.send({number:msg}) }) },
};