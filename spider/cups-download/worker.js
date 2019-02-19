const { 
  create_dir,
  download,
  DELAY_TIME,
  MAX_CONNECT_COUNT,
  MAX_NUMBER, 
} = require('./utils');


let successNum = 0;
let failNum = 0;

process.on('message', (msg) => {
  const startNum = msg.start;
  const dataList = msg.dataList;
  const pid = process.pid;
  console.log(`start: ${startNum} pid: ${pid} is working`);

  create_dir();
  let i = startNum;

  const timer = setInterval(() => {
    if (i > startNum + MAX_NUMBER - 1) {
      clearInterval(timer);
      process.send({ status: 'done', pid, success: successNum, fail: failNum })
      return;
    }
    // todo 支持并发

    const url = dataList[i];
    download(url, (status) => {
      status ? successNum++ : failNum++
    });
    i++;


  }, DELAY_TIME * 1000);

});