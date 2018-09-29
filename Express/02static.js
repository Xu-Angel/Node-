var express = require("express");
var app = express();
var fs = require("fs");
var router = express.Router();
app.use(express.static("./static"));//后台操作，匹配static
//托管静态资源中间件
// http://www.expressjs.com.cn/starter/static-files.html
//匹配html页面路径的前部分（static为后台自己创建的文件夹）
router.get("/",(req,res)=>{
    fs.readFile("./index.html",(err,content)=>{
        if(err){
            console.log(err);
            return;
        }
        res.end(content);
        app.set('title','我的网页');
app.get('title');
        // res.send('hello world');
    });
});

app.use("/",router);
app.listen(8888);