//标准I/O流
process.stdin.resume();//通知stream准备开始读取数据

process.stdin.setEncoding("utf8");//设置编码格式utf8

process.stdin.on("data",(text)=>{
    //process.stdout.write("你好:"+text)
    console.log(`你好:${text}`);
})
;
