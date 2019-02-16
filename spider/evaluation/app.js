var http = require('http');
var https = require('https');
var fs = require('fs');
var cheerio = require('cheerio');

function download(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, function (res) {
        var data = '';
        res.on('data', function (chunk) {
          data += chunk;
        });
        res.on('end', function () {
          resolve(data);
        });
      })
      .on('error', function (err) {
        reject(err);
      });
  })
}

function storeEvaluation(data, page) {
  page = page || 1
  var $ = cheerio.load(data);
  $('.evaluation .content-box').each(function (i, elem) {
    var name = $(this).find('a').text().trim()
    var comment = $(this).find('p').text().trim()
    var noComment = $(this).find('.no-data')
    // if (noComment) {
    //   console.log('评论页已抓完')
    //   return
    // }
    console.log(name, comment);
    if (i === 1) {
      // 创建当前评论页的txt
      fs.writeFile('./comment/comment' + 'page_' + page + '.txt', `${name}说：${comment}\n`, 'utf8', err => {
        if (err) {
          throw new Error(err);
        } else {
          // console.log(`${name}说：${comment}`);
        }
      });
    } else {
      // 追加当前评论页的txt
      fs.appendFile('./comment/comment' + 'page_' + page + '.txt', `${name}说：${comment}\n`, 'utf8', err => {
        if (err) {
          throw new Error(err);
        } else {
          // console.log(`${name}说：${comment}`);
        }
      });
    }
  });
}

let page = 0

setInterval(() => {
  if (page === 10)  return
  page++
  download(`https://www.imooc.com/course/coursescore/id/177?page=${page}`).then(rs => {
    console.log(rs)
    storeEvaluation(rs, page)
  })
}, 1500)