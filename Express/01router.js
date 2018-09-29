 const express = require('express')

 const app = express()

 //直接在app上用get、post 方法

 app.get('/product/info', (req, res) => {
   res.setHeader('Content-Type', 'text/html;charset=utf8')
   res.end('o')
 })

 app.post('')

 //用Router方法

 const Router = express.Router()
 
 Router.get('/product/info', (req, res) => {
   res.setHeader('Content-type', 'text/html;charset=utff8')
   res.end('o')
 })


app.listen(9999,"127.0.0.1",()=>{
  console.log("express  服务器开启成功！")
}
