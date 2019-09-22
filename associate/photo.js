// 导入模型
const photo = require('../entity/photo').photo;

module.exports = {
    // 查询所有
    findAndCountAll(req, res) {
        const { offset,limit } = req.body;
        photo.findAndCountAll({
            offset: Number(offset),
            limit: Number(limit),
        }).then(msg => { res.send(msg); })
    }
}