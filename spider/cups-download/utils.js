const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36";
const request = require('request');
const fs = require('fs');
// 每次请求延迟（秒）
const DELAY_TIME = 0.35
// 最大并发数，尽量不要设置得过大
const MAX_CONNECT_COUNT = 64
// 单任务爬取数
const MAX_NUMBER = 200

const uuid = () => {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  var uuid = s.join("");
  return uuid;
};

// 根据对应的url 返回headers
const get_headers = (url) => {
  console.log(url, 'url');
  if (url.startsWith('http://i.meizitu.net/')) {
    return { 'User-Agent': USER_AGENT, "Referer": 'http://www.mzitu.com' }
  }
  if (url.startswith("http://img.mmjpg.com/")) {
    return { 'User-Agent': USER_AGENT, "Referer": 'http://www.mmjpg.com' }
  }
};

const create_dir = () => {
  // 创建文件夹
  fs.access('img', fs.constants.F_OK, (err) => {
    if (err) {
      fs.mkdir('img', (err) => {
        console.log('create img folder failed')
      });
    }
    console.log(` ${err ? '不存在' : 'img文件夹存在'}`);
  });
}

const download = (url, callback) => {
  const options = {
    url,
    headers: get_headers(url),
  };
  const name = uuid() + '.jpg';
  const namePath = `img/${name}`
  request(options, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      console.log(url + ' download success.')
      callback && callback(1)
    } else {
      console.log(url + ' download failed.')
      callback && callback(1)
    }
  }).pipe(fs.createWriteStream(namePath))
}

module.exports = {
  uuid,
  get_headers,
  create_dir,
  download,
  DELAY_TIME,
  MAX_CONNECT_COUNT,
  MAX_NUMBER,
}