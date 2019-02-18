var http = require('http');
var fs = require('fs');
var cheerio = require('cheerio');
var url = 'http://www.ivsky.com/';

function download(url) {
  return new Promise((resolve, reject) => {
    http
    .get(url, function(res) {
      var data = '';
      res.on('data', function(chunk) {
        data += chunk;
      });
      res.on('end', function() {
        resolve(data);
      });
    })
    .on('error', function(err) {
      reject(err);
    });
  })
}

function storeImg(data, page) {
  page = page || 1
  if (data) {
    if (!fs.existsSync('./imgs')) {//查看是否存在这个文件夹
      fs.mkdir('./imgs')
      console.warn('%c创建目录完成')
    }
    // fs.access('./imgs', (err) => {
    //   console.error(err ? '目录/文件权限不存在' : '%c目录存在,可以进行读写')
    //   if (err) {
    //     fs.mkdir('./imgs')
    //     console.warn('%c创建目录完成')
    //   }
    // });
    var $ = cheerio.load(data);
    $('img').each(function(i, elem) {
      var imgSrc = $(this).attr('src');
      console.log(imgSrc, 'src');
      http.get(imgSrc, function(res) {
        var imgData = '';
        res.setEncoding('binary');
        res.on('data', function(chunk) {
          imgData += chunk;
        });
        res.on('end', function() {
          var imgPath = '/' + page + '_' + i + '.' + imgSrc.split('.').pop();
          fs.writeFile('./imgs' + imgPath, imgData, 'binary', err => {
            if (err) {
              throw new Error(err);
            } else {
              console.log(imgPath);
            }
          });
        });
      });
    });
  }
}


let page = 0
setInterval(() => {
  page++
  download(`http://www.ivsky.com/bizhi/zhiwu/index_${page}.html`).then(rs => {
    storeImg(rs, page)
  })
}, 5000)