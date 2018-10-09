/* const cluster = require('cluster')
const os = require('os')
const http = require('http')

if (cluster.isMaster) {
    console.log('是主进程')
    const cpus = os.cpus() // cpu 信息
    const cpusLength = cpus.length  // cpu 核数
    for (let i = 0; i < cpusLength; i++) {
        // fork() 方法用于新建一个 worker 进程，上下文都复制主进程。只有主进程才能调用这个方法
        // 该方法返回一个 worker 对象。
        cluster.fork()
    }
} else {
    console.log('不是主进程')
    // 运行该 demo 之后，可以运行 top 命令看下 node 的进程数量
    // 如果电脑是 4 核 CPU ，会生成 4 个子进程，另外还有 1 个主进程，一共 5 个 node 进程
    // 其中， 4 个子进程受理 http-server
    http.createServer((req, res) => {
        res.writeHead(200)
        res.end('hello world')
    }).listen(8000)  // 注意，这里就不会有端口冲突的问题了！！！
} */
const cluster = require('cluster')
const os = require('os')
const http = require('http')

if (cluster.isMaster) {
  const num = os.cpus().length
  console.log('Master cluster setting up ' + num + ' workers...')
  for (let i = 0; i < num; i++) {
      // 按照 CPU 核数，创建 N 个子进程
      cluster.fork()
  }
  cluster.on('online', worker => {
      // 监听 workder 进程上线（启动）
      console.log('worker ' + worker.process.pid + ' is online')
  })
  cluster.on('exit', (worker, code, signal) => {
      // 兼容 workder 进程退出
      console.log('worker ' + worker.process.pid + ' exited with code: ' + code + ' and signal: ' + signal)
      // 退出一个，即可立即重启一个
      console.log('starting a new workder')
      cluster.fork()
  })
}