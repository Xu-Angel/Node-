
// TODO:起始点：
/* var http = require('http')

function serverCallback(req, res) {
    res.writeHead(200, {'Content-type': 'text/html'})
    res.write('<h1>hello nodejs</h1>')
    res.end()
} */
// TODO:出发

/* http.createServer(serverCallback).listen(8080)

var http = require('http')

function serverCallback(req, res) {
    var method = req.method.toLowerCase() // 获取请求的方法
    if (method === 'get') {
      res.writeHead(200, {'Content-type': 'text/html'})
      res.write('<h1>hello nodejs</h1>')
      res.end()
    }
    if (method === 'post') {
        // 接收 post 请求的内容
        var data = ''
        req.on('data', function (chunk) {
            // “一点一点”接收内容
            data += chunk.toString()
        })
        req.on('end', function () {
            // 接收完毕，将内容输出
            res.writeHead(200, {'Content-type': 'text/html'})
            res.write(data)
            res.end()
        })
    }
    
}
http.createServer(serverCallback).listen(8080) */

/* // TODO:中途
var http = require('http')

function serverCallback(req, res) {
    var method = req.method.toLowerCase()
    var contentType = req.headers['content-type']
    if (method === 'post') {
        if (contentType === 'application/x-www-form-urlencoded') {
            // 省略 N 行
        }
        if (contentType === 'application/json') {
            var data = ''
            req.on('data', function (chunk) {
                data += chunk.toString()
            })
            req.on('end', function () {
                data = JSON.parse(data) // post 的数据为 JSON 格式，因此直接可以转换为 JS 对象
                res.writeHead(200, {'Content-type': 'application/json'})
                res.write(JSON.stringify(data)) // res 只能输出字符串或者 Buffer 类型，因此这里只能 JSON.stringify 之后再输出
                res.end()
            })
        }
    }
    
}
http.createServer(serverCallback).listen(8080) */


// TODO: 再出发  参数
/* var http = require('http')
var url = require('url')
var querystring = require('querystring')

// 处理 url 参数
function serverCallback(req, res) {
    var urlData = url.parse(req.url) // 结构化 url 内容，变为 JS 对象
    var query = urlData.query
    query = querystring.parse(query)  // 结构化 query 内容，变为 JS 对象

    res.writeHead(200, {'Content-type': 'text/html'})
    res.write(JSON.stringify(query))
    res.end()
}
http.createServer(serverCallback).listen(8080) */

// TODO:再起飞 路由
/* var http = require('http')
var url = require('url')

function serverCallback(req, res) {
    var urlData = url.parse(req.url)
    var pathname = urlData.pathname // 获取 url 路由

    res.writeHead(200, {'Content-type': 'text/html'})
    res.write(pathname)
    res.end()
}
http.createServer(serverCallback).listen(8080) */

// TODO:吃饼干 设置cookie
var http = require('http')

function serverCallback(req, res) {
    res.writeHead(200, {
        'Content-type': 'text/html',
        // 'Set-Cookie': 'a=100'           // 设置单个值
        'Set-Cookie': ['a=100', 'b=200']   // 这是多个值
    })
    res.write('hello nodejs')
    res.end()
}
http.createServer(serverCallback).listen(8080)
