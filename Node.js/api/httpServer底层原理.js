
/**
 * 
 */
const net =require('net'),fs=require('fs');
const server=net.createServer((socket)=>{
     fs.readFile('./index.html',(error,content)=>{
       content=content.toString();
       socket.write(`HTTP/1.1 200 OK\r\nContent-Type:text/html; charset=utf-8\r\nContent-Length:${content.length}\r\n\r\n${content}`);
     });
});
server.listen(8888,()=>{
  console.log('服务器开启成功，可通过8888端口');
});