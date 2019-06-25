const Sequelize = require('sequelize')
const conn = require('../orm/orm').connection();
const jwt = require('jsonwebtoken')
const secret = require('../utils/key/secret').token

// 模型层定义
let user = conn.define(
    // 默认表名（一般这里写单数），生成时会自动转换成复数形式
    // 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
    'user',
    // 字段定义（主键、created_at、updated_at默认包含，不用特殊定义）
    {
        'id': { 'type': Sequelize.INTEGER(11), 'allowNull': true, 'primaryKey': true, 'autoIncrement': true },
        'name': { 'type': Sequelize.CHAR(255), 'allowNull': true },
        'pass': { 'type': Sequelize.CHAR(255), 'allowNull': true },
        'type': { 'type': Sequelize.INTEGER(11), 'allowNull': true },
    },
    {
        // 自定义表名
        'freezeTableName': true,
        'tableName': 'xxts_users',
        // 是否需要增加createdAt、updatedAt、deletedAt字段
        'timestamps': true,
        // 'createdAt': false,   // 不需要createdAt字段
        //'updatedAt': 'utime'   // 将updatedAt字段改个名
        // 将deletedAt字段改名
        // 同时需要设置paranoid为true（此种模式下，删除数据时不会进行物理删除，而是设置deletedAt为当前时间
        // 'deletedAt': 'dtime',
        // 'paranoid': true
    }
);


module.exports = {
    // 模型实体
    user,
    // 查询所有
    findAndCountAll(req,res){
        user.findAndCountAll().then( msg => { res.send(msg) })       
    },
    //更新密码（密码找回）
    updatePass(req,res){
        user.update(
            { 'pass':req.body.pass },
            {
                'where':{ 'mail':req.body.mail }
            }).then( msg=>{ res.send(msg); })
    },
    //删除用户
    delete(req,res){
        user.destroy(
            {
                where:{ 'id':req.body.id },
                
            }
        ).then( msg=>{ res.send({'affectRows':msg}); })
    },
    //更新用户信息
    update(req,res){
        user.update(
            {  
                'openid':req.body.openid,
                'sessionid':req.body.sessionid,
                'name':req.body.name,
                'pass':req.body.pass,
                'type':req.body.type,
                'mail':req.body.mail,
                'phone':req.body.phone,
                'condition':req.body.condition,
                'school_id':req.body.school_id,
            },
            {   'where':{ 'id':req.body.id }
        }).then( msg=>{ res.send(msg); })
    }
};