//导入express,xtpl包
var express = require("express");
var xtpl = require("xtpl");
var bodyParser = require('body-parser');//解析post参数
//data就是数据，json格式
let data = require("./data.json");
//实例化express
var app = express();
var router = express.Router();
app.use(express.static("./static"));
app.use(bodyParser());
//设置模板,会自动去views文件夹中查找.html
app.set("views","./views");
//设置当前视图引擎中的模板的扩展名.html
app.set("view engine",".html");
//设置解析views/.html模板的方法xtpl.renderFile,它会自动代替res.render()方法，从而使得
//程序的扩展性变强
app.engine("html",xtpl.renderFile);

//定义路由 http://127.0.0.1:8888/
router.get("/",(req,res)=>{
    res.render("index.html",{data},(err,content)=>{
        if(err){
            console.log(err);
            return;
        }
        res.end(content)
    })
})
//get:"/del/:id"  req.params.id
router.post("/del",(req,res)=>{
    console.log(req.body)
})

app.use("/",router);

app.listen(8888);

