const express = require('express')
const cors = require('cors')
const app = express()
/* 
XXX: doc:  http://www.expressjs.com.cn/en/resources/middleware/cors.html
*/

// 原生方式
app.all('*', (req, res, next) => {
  const { origin, Origin, referer, Referer } = req.headers
  const allowOrigin = origin || Origin || referer || Referer || '*'
  res.header("Access-Control-Allow-Origin", allowOrigin)
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
  res.header("Access-Control-Allow-Credentials", true) //可以带cookies
  res.header("X-Powered-By", 'Express')
  if (req.method == 'OPTIONS') {
    res.sendStatus(200)
  } else {
    next()
  }
})

// 使用cors 插件
app.use(cors())   // 全局使用 默认跨域插件配置


// 具体到某条路由跨域
app.get('/cors', cors(), (req, res, next) => {
  res.send({msg: '这个路由是可跨域的'})
})


// 配置cors 插件参数
const crosConfig = {
  origin: 'http://others.com',
  optionsSuccessStatus: 200 // hack 一些老浏览器(IE11, various SmartTVs)
}
app.get('/products/:id', cors(crosConfig), function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for only others.com.'})
})


// 配置白名单
var whitelist = ['http://example1.com', 'http://example2.com']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.get('/products/:id', cors(corsOptions), function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for a whitelisted domain.'})
})



