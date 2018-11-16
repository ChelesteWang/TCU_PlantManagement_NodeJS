const promise=require('../../promise/promise');
const time=require('../../time/time');
module.exports={
    //查询所有all plants
    selectAllPlants:function(req,res){
        function sel(req,res){            
            var sql=`select * from plant;`;
            fun(sql);
        }
        async function fun(sql) {
            const result = await promise.dbupAsync(sql);
            res.send(result);
        }
        sel(req,res);
    },
    //插入植物insert plants
    insertPlants:function(req,res){
        function sel(req,res){      
            var plantid=req.query.plantid;
            var aname=req.query.aname;
            var alias=req.query.alias; 
            var lname=req.query.lname;
            var family=req.query.family;
            var genera=req.query.genera;
            var specie=req.query.specie;
            var morphology=req.query.morphology;
            var habit=req.query.habit;
            var purpose=req.query.purpose;
            var sql=`insert INTO plant VALUES ('${plantid}','${aname}','${alias}','${lname}','${family}','${genera}','${specie}','${morphology}','${habit}','${purpose}');`
            console.log('insert into plant ---->\n',sql)
            fun(sql);
        }
        async function fun(sql) {
            const result = await promise.dbupAsync(sql);
            res.send(result);
        }
        sel(req,res);
    },
    //查询植物 by id
    selectPlantById:function(req,res){
        function sel(req,res){                  
            var plantid=req.query.plantid;      
            var sql=`select * from plant where plantid="${plantid}";`;
            fun(sql);
        }
        async function fun(sql) {
            const result = await promise.dbupAsync(sql);
            res.send(result);
        }
        sel(req,res);
    },
    //用户更新植物信息
    updatePlantInfo:function(req,res){
        function sel(req,res){          
            var plantid=req.query.plantid;
            var aname=req.query.aname;
            var alias=req.query.alias; 
            var lname=req.query.lname;
            var family=req.query.family;
            var genera=req.query.genera;
            var specie=req.query.specie;
            var morphology=req.query.morphology;
            var habit=req.query.habit;
            var purpose=req.query.purpose; 
            var sql=`UPDATE plant SET AcademicName="${aname}",Alias="${alias}",LatinName="${lname}",Family="${family}",Genera="${genera}",Specie="${specie}",Morphology="${morphology}",Habit="${habit}",Purpose="${purpose}" WHERE PlantID="${plantid}";`;
            fun(sql);
        }
        async function fun(sql) {
            const result = await promise.dbupAsync(sql);
            res.send(result);
        }
        sel(req,res);
    }
}