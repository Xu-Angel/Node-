const express = require('express');
const app = express();
const router = express.Router();
/* 
docs: http://www.expressjs.com.cn/guide/using-middleware.html
*/
// next  用法，作为第三个参数传入，在第一个函数中调用next(),第二个
//为next()要执行的事件
router.get('/login',function(req,res,next){
   res.write('hello next');
   next();
},function(req,res){
res.end('i  am  next ,i am coming')
});
app.use('/',router);
app.listen(9999);
/* 
const  express=require('express');
const app=express();
const router=express.Router();
router.get('./login',(req,res,next)=>{
   res.write();next();
},function(req,res){
  res.end();
})
app.use('/',router)
*/