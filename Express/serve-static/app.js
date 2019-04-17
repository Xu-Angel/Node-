const express = require('express')
const serveStatic = require('serve-static')
const path =reqiure('path')
const app = express()
/* 
docs： http://www.expressjs.com.cn/en/resources/middleware/serve-static.html
docs2: http://www.expressjs.com.cn/starter/static-files.html
*/
// 配置路径
app.use(serveStatic(path.resolve(__dirname, './public')))
app.use('/logs',serveStatic(path.resolve(__dirname, './logs')))