// 导入模型
const kind = require('../entity/kind').kind;

module.exports = {
    // 查询所有
    findAndCountAll(req, res) {
        const { offset,limit } = req.body;
        kind.findAndCountAll({
            offset: Number(offset),
            limit: Number(limit),
        }).then(msg => { res.send(msg); })
    }
}