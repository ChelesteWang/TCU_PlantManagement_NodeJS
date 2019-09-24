// 导入模型
const user = require('../entity/user').user;
const callback = require('../entity/callback').callback;
// 关联对象
callback.belongsTo(user, { foreignKey: 'user_id' })
user.hasOne(callback)

module.exports = {
    // 查询所有
    findAndCountAll(req, res) {
        const { offset,limit } = req.body;
        callback.findAndCountAll({
            include: [{ model: user }],
            offset: Number(offset),
            limit: Number(limit),
        }).then(msg => { res.send(msg); })
    },
    // 按id查询
    findOneById(req, res) {
        callback.findById(
            req.body.id,
            { include: [{ model: user }]
        }).then(msg => { res.send(msg); })
    }
}