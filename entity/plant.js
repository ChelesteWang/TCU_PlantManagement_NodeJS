const Sequelize = require('sequelize')
const conn = require('../orm/orm').connection();
var co = require('co');  //yield
const qr = require('qr-image')
const fs = require('fs')

// 模型层定义
let plant = conn.define(
    // 默认表名（一般这里写单数），生成时会自动转换成复数形式
    // 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
    'plant',
    // 字段定义（主键、created_at、updated_at默认包含，不用特殊定义）
    {
        'id': { 'type': Sequelize.INTEGER(11), 'allowNull': true, 'primaryKey': true, 'autoIncrement': true },
        'name': { 'type': Sequelize.CHAR(255), 'allowNull': true },
        'sciname': { 'type': Sequelize.CHAR(255), 'allowNull': true },
        'kind': { 'type': Sequelize.CHAR(255), 'allowNull': true },
        'detail_id': { 'type': Sequelize.INTEGER(11), 'allowNull': true },
    },
    {
        'timestamps': true,     // 是否需要增加createdAt、updatedAt、deletedAt字段
        // 'paranoid': true    // 添加delete_at 不会进行物理删除
    }
);


module.exports = {
    // 模型实体
    plant,
    // 查询所有
    findAndCountAll: function (req, res) {
        co(function* () {
            var p = yield plant.findAndCountAll({
                'attributes': ['id', 'name', 'sciname', 'detail_id'],
                // 'limit': parseInt(req.body.limit),
                // 'offset': parseInt(req.body.offset)
            })
            console.log(p.rows[0].dataValues);
            p.rows.forEach(item => {
                let code = qr.image(JSON.stringify(item.dataValues), { type: 'png' })
                code.pipe(fs.createWriteStream(`${item.dataValues.id}.png`))
            });
        });
    },
    creat(req, res) {
        plant.create({
            'id': req.body.id,
            'name': req.body.name,
            'sciname': req.body.sciname,
            'kind': req.body.kind,
            'detail_id': req.body.detail_id
        }).then(msg => res.send(msg))
    },
    //删除
    delete(req, res) {
        plant.destroy(
            { where: { 'id': req.body.id } }
        ).then(msg => { res.send({ 'deleted': msg }); })
    },
    //更新信息
    update(req, res) {
        plant.update(
            {
                'name': req.body.name,
                'sciname': req.body.sciname,
                'kind': req.body.kind,
                'detail_id': req.body.detail_id
            },
            {
                'where': { 'id': req.body.id }
            }).then(msg => { res.send(msg); })
    }
};