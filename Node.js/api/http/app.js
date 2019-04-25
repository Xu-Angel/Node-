const http = require('http')
const hostName = '127.0.0.1'
const port = 3000

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('Hell World\n')
})

server.listen(port, hostName, () => {
  console.log(`服务运行于 http://${hostName}:${port}/`);
})

// https://nodejs.org/zh-cn/docs/guides/debugging-getting-started/

//

/* 
由于调试器对 Node.js 执行环境具有完全访问权限，所以能够连接到该端口的恶意角色可以执行任意操作。代码代表节点进程。理解将调试器端口暴露在公共和专用网络上所受影响的安全性是很重要的。

把调试端口暴漏在公共网络是不安全的
如果调试器与一个公共的 IP 地址绑定，或者与 0.0.0.0 绑定，任何可以访问你 IP 地址的客户端都可以在不受限的情况下连接调试器，然后随意运行代码。

默认情况下，node --inspect 绑定 127.0.0.1。你可以显式提供一个 IP 地址或是 0.0.0.0 的地址等。如果你有意想要外部连接可以访问此调试器，这么做恐怕会把你置于潜在的巨大的威胁中。我们建议你有合适的防火墙以及访问控制权限，以提供一个安全的暴漏。

查看 ' 启用远程调试情形 ' 章节部分，以了解如何安全地允许远程调试器连接调试。

本地应用有足够的权限访问监视器
即便你把监视器绑定到 127.0.0.1（默认），任何在你本地机器上运行的应用程序仍然毫无限制地可以访问。这是因为在设计上我们允许本地调试器可以轻松方便地进行连接
*/