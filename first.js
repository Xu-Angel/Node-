// 理解http，基本的请求响应模型
/* const http = require('http')
http.createServer((req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/plain"
  })
  res.write("hello-word")
  res.end()
  console.log('yes')
}).listen(8888) */
//  理解事件驱动，凡是简单on("data",function(chunk){}的，是listener监听器，都是继承自EventEmit才有的功能，那么事件emit发射在哪里？自己试着想想
// 理解Stream，各种语言、框架里pipe管道（比如shell里，比如gulp里的pipe），本身http就是io操作比较多，使用Stream流式处理可以减少切换成本，无中间文件等，Stream学习资料https://cnodejs.org/topic/570b1fa494b38dcb3c09a7f8
/* const http = require('http')
http.createServer((req, res) => {
  let body = []
  req.on('data', (chunk) => {
    body.push(chunk)
  }).on('end', () => {
    body = Buffer.concat(body).toString()
    res.end(body)
  })
}).listen(8888) */

const http = require('http')
http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/echo') {
    req.pipe(res)
  } else {
    res.statusCode = 404
    res.end()
  }
}).listen(8888)