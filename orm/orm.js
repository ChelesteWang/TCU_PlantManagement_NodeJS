const mysql = require('mysql');
const Sequelize=require('sequelize')
const log=require('../log/log')

const plat = process.argv[2] || 'dev';  // dev.开发环境，mas.正式环境

let dbname, uname, pass, host;
if(plat === 'mas'){
    dbname = 'school_tree';
    uname = 'user';
    pass = 'yexuan@0628';
    host = '42.81.142.18'
}else{
    dbname = 's_tree';
    uname = 'root';
    pass = 'yexuan0628';
    host = '127.0.0.1'
}
console.warn('当前运行环境为:',plat,'\n指向服务器host地址为:',host);

module.exports = {
    //sequelize ORM对象关系映射 
    connection:function(req,res){
        var sequelize = new Sequelize(
            dbname,
            uname,
            pass,
            {
                'dialect': 'mysql',
                host,
                'port': 3306,
                'define': {
                    'underscored': true
                },
                timezone: '+08:00',
                logging:log.info
            }
        )
        return sequelize;
    }
}