const mailUtil=require('./mailUtils')

var schoolArray=['点击选择学校（暂只支持天津地区）', '南开大学', '天津大学', '中国民航大学', '天津城建大学', '天津职业技术师范大学',
'天津工业大学', '天津科技大学', '天津理工大学', '天津医科大学', '天津中医药大学', '天津师范大学',
'天津财经大学', '天津商业大学', '天津天狮学院', '天津农学院', '天津外国语大学', '天津体育学院',
'天津音乐学院', '天津美术学院']

module.exports={
    //login注册验证
    register:function(req,res){          
        var mail_address=req.query.mail_address;  
        var name=req.query.name;    
        var code=req.query.code;
        mailUtil(`${mail_address}`,`PocketSchool 验证短信...`, `HELLO ${name},您的验证码为：${code}`,res);
    },
    //校园大使验证
    rz_dashi:function(req,res){          
        var mail_address='1191882955@qq.com';  
        
        var openid=req.query.openid;
        var name=req.query.name;
        var school=req.query.school;
        var xuehao=req.query.xuehao;
        var phone=req.query.phone;
        var e_mail=req.query.e_mail;
        var rz_icon=req.query.rz_icon;

        var msg=`<h1>有新的校园大使申请</h1>
         <br> openid为：${openid}, <br> name为：${name}, <br> school为：${schoolArray[school]}, 
         <br> xuehao为:${xuehao}, <br> phone为:${phone}, <br> e_mail为：${e_mail}, <br> rz_icon为：${rz_icon}
         <br> 
         <hr> 
         <img border="0" src="${rz_icon}" alt="Pulpit rock">
         `;

        mailUtil(`${mail_address}`,`PocketSchool 校园大使验证信息...`, msg,res);
    },
}