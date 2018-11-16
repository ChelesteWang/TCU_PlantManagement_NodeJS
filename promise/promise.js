const mysql = require('mysql');

function con() {
    var db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'yexuan0628',
        database: 'tcu_forest_management'
    });
    return db;
}

module.exports = {
    //sql 操作
    dbupAsync: function (sql) {
        const p = new Promise((resolve, reject) => {
            var db = con();
            db.query(sql, (err, data) => {
                if (err) {
                    resolve(`{ "success": "false" }`);
                    db.end();
                }
                else {
                    resolve(data);
                    db.end();
                }
            });
        });
        return p;
    },
    //file 操作
    fileupAsync: function (req,res,pathlib,fs) {
        const p = new Promise((resolve, reject) => {
            console.log(req.files);
            //获取原始文件扩展名
            var newName = req.files[0].path + pathlib.parse(req.files[0].originalname).ext;
            console.log(pathlib.parse(req.files[0].originalname).ext);      //输出文件后缀
            console.log("--->", newName);
            fs.rename(req.files[0].path, newName, function (err) {
                if (err) {
                    console.log("上传失败");
                    //res.send(JSON.parse(`{ "file upload success ?": "flase" }`))
                    resolve(`{ "file upload success ?": "flase" }`);
                } else {
                    console.log("上传成功");
                    // res.send(JSON.parse(`{ "file upload success ?": "true" ,"filename":"${newName}"}`))
                    resolve(`{ "file upload success ?": "true" ,"filename":"${newName}"}`);
                }
            });
        });
        return p;
    }
} 