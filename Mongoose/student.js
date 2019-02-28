//1.0 导入包
const mongoose = require("mongoose");
//2.0 链接数据库
mongoose.connect("mongodb://127.0.0.1:27017/students");
//3.0 定义一个 json数据文件中对象的属性及属性值的类型
var infoSchema = new mongoose.Schema({
    title: String,
    name: String,
    age: Number
});
//4.0 以此规则建立一个叫做info的数据库文件(类似json文件)
var info = mongoose.model("info",infoSchema);
//5.0 往info表中插入一条数据
info.create({title: "西厢记",name: "曹雪芹",age: 77},(err,data)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log("数据插入成功!")
});
info.create({title: "西记",name: "雪芹",age: 77},(err,data)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log("数据插入成功!")
});
//6.0 在info文件中查找符合条件的数据
info.find({title: "西厢记"},function(err,data){
    if(err){
        console.log(err);
        return;
    }
    console.log(data);
});
//7.0 在info表中删除符合条件的数据
info.remove({title: "西厢记"},(err)=>{
    if(err){console.log(err)}
})
//8.0 在info表中修改符合条件的一条数据
info.update({name:"曹雪芹"},{'$set':{name:"雪芹"}},function(){
        info.find({name:"雪芹"},function(err,data){
            if(err){
                console.log(err);
                return;
            }
            console.log(data)
        });
})


