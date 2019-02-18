// 文档 https://github.com/caolan/async#queueworker-concurrency
// 第二阶段代码其实是不完美的。为什么这么说，是因为我们一次性发了 40 个并发请求出去，要知道，除去 CNode 的话，别的网站有可能会因为你发出的并发连接数太多而当你是在恶意请求，把你的 IP 封掉。

// 我们在写爬虫的时候，如果有 100 个链接要去爬，那么不可能同时发出 100 个并发链接出去对不对？我们需要控制一下并发的数量，比如并发 10 个就好，然后慢慢抓完这 100 个链接。

// 这次我们要介绍的是 async 的 mapLimit(arr, limit, iterator, callback) 接口。 改造代码如下：

const async = require('async');
const superagent = require('superagent');
const cheerio = require('cheerio');
const url = require('url');
const express = require('express')
const cnodeUrl = 'https://cnodejs.org/';
const fs = require('fs')
const app = new express()
app.get('/', (req, resp, next) => {
  // 并发连接数的计数器
  let concurrencyCount = 0;

  superagent.get(cnodeUrl)
    .end(function (err, res) {
      if (err) {
        return console.error(err);
      }
      let topicUrls = [];
      const $ = cheerio.load(res.text);
      $('#topic_list .topic_title').each(function (idx, element) {
        const $element = $(element);
        const href = url.resolve(cnodeUrl, $element.attr('href'));
        topicUrls.push(href);
      });

      async.mapLimit(topicUrls, 3, function (url, callback) {
        concurrencyCount++;
        console.time('  耗时');
        console.log('现在的并发数是', concurrencyCount, '，正在抓取的是', url);
        superagent.get(url)
          .end(function (err, res) {
            console.timeEnd("  耗时");
            concurrencyCount--;
            const $ = cheerio.load(res.text);
            const title = $('.topic_full_title').text().trim().replace(/\n/g, '')
            const href = url
            const comment1 = $('.reply_content').eq(0).text().trim().replace(/\n/g, '') || '评论为空'
            fs.appendFile('cnode.txt',
              `title:${title}

               href: ${href}

               comment1: ${comment1}

               `, err => {
              if (err) console.log(err);
            })
            res
            callback(null, {
              title,
              href,
              comment1,
            });
          });
      }, function (err, result) {
        console.log('final:');
        console.log(result);
        fs.writeFile('conde.json', JSON.stringify(result)) //TODO!
        resp.send(result)
        resp.end()
      });

    })
})

app.listen(3002, () => {
  console.log('爬虫开启在3002窗口')
})