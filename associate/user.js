// 导入模型
const user = require('../entity/user').user;
const info = require('../entity/info').info;
// 关联对象
info.belongsTo(user, { foreignKey: 'user_id' })
user.hasOne(info)

module.exports = {
    // 查询所有
    findAndCountAll(req, res) {
        const { offset,limit } = req.body;
        user.findAndCountAll({
            include: [{ model: info }],
            offset: Number(offset),
            limit: Number(limit),
        }).then(msg => { res.send(msg); })
    },
    // 按用户类型查询
    findAndCountAllByType(req, res) {
        const { type,offset,limit } = req.body;
        user.findAndCountAll({
            where: { type },
            include: [{ model: info }],
            offset: Number(offset),
            limit: Number(limit),
        }).then(msg => { res.send(msg); })
    },
    // 按id查询
    findOneById(req, res) {
        user.findById(
            req.body.id,
            { include: [{ model: info }]
        }).then(msg => { res.send(msg); })
    }
}