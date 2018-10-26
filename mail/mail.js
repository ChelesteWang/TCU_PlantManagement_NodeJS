const mailUtil=require('./mailUtils')

var Array=['','']

module.exports={
    //login注册验证
    register:function(req,res){          
        var mail_address=req.query.mail_address;  
        var code=req.query.code;
        var msg=`<h3>天津城建大学 校园植物信息管理系统</h3>
        <br> 您的验证码为：
        <br> <h3>${code}</h3>
        `
        mailUtil(`${mail_address}`,`天津城建大学 校园植物信息管理系统 验证短信...`, msg,res);
    }
}