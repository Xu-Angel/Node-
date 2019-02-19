const fs = require('fs');
const cluster = require('cluster');
const cpus = require('os').cpus();
const { MAX_NUMBER } = require('./utils');


const data = fs.readFileSync('./data.txt');
const dataList = data.toString('utf8').split('\n');
let taskDoneNum = 0;

cluster.setupMaster({
  exec: 'worker.js',
});
console.time('start');
cpus.forEach((t, i) => {
  const worker = cluster.fork();
  worker.send({ start: i * MAX_NUMBER, dataList })
  worker.on('message', (msg) => {
    taskDoneNum += 1;
    console.log(msg, taskDoneNum);
    if (taskDoneNum === cpus.length) {
      console.timeEnd('start');
      // 所有任务都完成后自杀
      // todo 磁盘写入完成后杀掉进程
      setTimeout(() => {
        process.kill(process.pid);
      }, 5000)
    }
  })
});