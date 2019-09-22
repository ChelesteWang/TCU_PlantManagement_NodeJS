// 导入模型
const list = require('../entity/list').list;
const kind = require('../entity/kind').kind;
const plant = require('../entity/plant').plant;

// 关联对象
list.belongsTo(kind, { foreignKey: 'kind_id' })
kind.hasOne(list)
list.belongsTo(plant, { foreignKey: 'plant_id' })
plant.hasOne(list)

module.exports = {
    // 查询所有
    findAndCountAll(req, res) {
        const { offset,limit } = req.body;
        list.findAndCountAll({
            include: [{ model: kind },{ model: plant }],
            order:[['id', 'ASC']],
            offset: Number(offset),
            limit: Number(limit),
        }).then(msg => { res.send(msg); })
    },
    // 按id查询
    findOneById(req, res) {
        list.findById(
            req.body.id,
            {  include: [{ model: kind },{ model: plant }],
        }).then(msg => { res.send(msg); })
    },
    // 模糊搜索 name
    findAndCountAllByName(req,res){
        const { name,offset,limit } = req.body;
        list.findAndCountAll({
            where:{
                'name':{
                    $like:`%${name}%`
                }
            },            
            include: [{ model: kind },{ model: plant }],
            order:[['id', 'ASC']],
            offset: Number(offset),
            limit: Number(limit),
        }).then(msg => { res.send(msg); })
    },
    // 按类型查询
    findAndCountAllByKind(req,res){
        console.log('lalalala')
        const { kind_id,offset,limit } = req.body;
        list.findAndCountAll({
            where : { kind_id },
            include: [{ model: kind },{ model: plant }],
            order:[['id', 'ASC']],
            offset: Number(offset),
            limit: Number(limit),
        }).then(msg => { res.send(msg); })
    }
}