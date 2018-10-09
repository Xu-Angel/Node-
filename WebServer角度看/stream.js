/* const fs= require('fs')
const readStream = fs.createReadStream('./file1.txt')

let length = 0 
readStream.on('data', (chunk) => {
  length += chunk.toString().length
  console.log(chunk, Date());
})
readStream.on('end', () => {
  console.log(length)
}) */


/* 
var fs = require('fs')
var readStream = fs.createReadStream('./file1.txt')
var writeStream = fs.createWriteStream('./file2.txt')
readStream.pipe(writeStream) */

/* var http = require('http')  // Transfer-Encoding:chunked 使用 Stream 处理 http res 会提高性能。因为这样直接输出的是二进制，而res.write('hello nodejs')输出的是字符串，还得经过编码转换
var fs = require('fs')
function serverCallback(req, res) {
    var readStream = fs.createReadStream('./file1.txt')
    res.writeHead(200, {'Content-type': 'text/html'})
    readStream.pipe(res)
}
http.createServer(serverCallback).listen(8181) */

/* var fs = require('fs')
var zlib = require('zlib')
var readStream = fs.createReadStream('./file1.txt')
var writeStream = fs.createWriteStream('./file1.txt.gz')
readStream.pipe(zlib.createGzip())
          .pipe(writeStream) */

/*           var http = require('http')
          var fs = require('fs')
          var zlib = require('zlib')
          function serverCallback(req, res) {
              var readStream = fs.createReadStream('./file1.txt')
              res.writeHead(200, {'Content-type': 'application/x-gzip'})  // 注意这里返回的 MIME 类型
              readStream.pipe(zlib.createGzip())  // 一行代码搞定压缩功能
                        .pipe(res)
          }
          http.createServer(serverCallback).listen(8282) */

          var str = '深入浅出nodejs'
var buf = new Buffer(str, 'utf-8')
console.log(buf)  // <Buffer e6 b7 b1 e5 85 a5 e6 b5 85 e5 87 ba 6e 6f 64 65 6a 73>
console.log(buf.toString('utf-8'))  // 深入浅出nodejs