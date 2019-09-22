// 导入模型
const plant = require('../entity/plant').plant;

module.exports = {
    // 查询所有
    findAndCountAll(req, res) {
        const { offset,limit } = req.body;
        plant.findAndCountAll({
            offset: Number(offset),
            limit: Number(limit),
        }).then(msg => { res.send(msg); })
    }
}