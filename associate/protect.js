// 导入模型
const protect = require('../entity/protect').protect;

module.exports = {
    // 查询所有
    findAndCountAll(req, res) {
        const { offset,limit } = req.body;
        protect.findAndCountAll({
            offset: Number(offset),
            limit: Number(limit),
        }).then(msg => { res.send(msg); })
    }
}