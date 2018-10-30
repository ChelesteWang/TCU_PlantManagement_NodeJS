const promise=require('../../promise/promise');
const time=require('../../time/time');
module.exports={
    //登录验证
    login:function(req,res){
        function sel(req,res){            
            var username=req.query.username;
            var password=req.query.password;
            var sql=`select * from users where username="${username}" and password="${password}";`;
            console.log(sql)
            fun(sql);
        }
        async function fun(sql) {
            const result = await promise.dbupAsync(sql);
            // if(result.length!=1)    res.send("账户名或密码错误！");
            // else  
            res.send(result);
        }
        sel(req,res);
    },
    //查询用户all
    selectAllUsers:function(req,res){
        function sel(req,res){            
            var sql=`select * from users;`;
            fun(sql);
        }
        async function fun(sql) {
            const result = await promise.dbupAsync(sql);
            res.send(result);
        }
        sel(req,res);
    },
    //插入用户
    insertUsers:function(req,res){
        function sel(req,res){      
            var userid=req.query.userid;
            var username=req.query.username;
            var password=req.query.password; 
            var type=req.query.type;
            var details=req.query.details;
            var email=req.query.email;
            var icon=req.query.icon;
            // var sql=`insert into users values("${userid}","${username}","${password}",
            // "${type}","${time.getTime()}","${details}","${icon}");`;
            var sql=`insert INTO users (username,password,email) VALUES ('${username}','${password}','${email}');`
            console.log(sql)
            fun(sql);
        }
        async function fun(sql) {
            const result = await promise.dbupAsync(sql);
            res.send(result);
        }
        sel(req,res);
    },
    //查询用户是否注册 by email
    selectUsersByEmail:function(req,res){
        function sel(req,res){                  
            var email=req.query.email;      
            var sql=`select * from users where email="${email}";`;
            fun(sql);
        }
        async function fun(sql) {
            const result = await promise.dbupAsync(sql);
            if(result.length==0){
                res.send(`{ "success": "true" }`);
            }else{
                res.send(`{ "success": "oversize" }`);
            }
        }
        sel(req,res);
    },
    
    //用户更新密码
    updateUserPassword:function(req,res){
        function sel(req,res){           
            var password=req.query.password;                
            var email=req.query.email;  

            var sql=`update users set password="${password}" where email=${email};`;
            fun(sql);
        }
        async function fun(sql) {
            const result = await promise.dbupAsync(sql);
            res.send(result);
        }
        sel(req,res);
    }
}