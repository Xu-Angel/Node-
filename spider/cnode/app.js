 
 // 第一阶段 抓取主页内容
const cheerio = require('cheerio')
const superagent = require('superagent')
const express = require('express')

const app = express()
app.get('/', (req, res, next) => {
  superagent.get('https://cnodejs.org/')
    .end((err, rs) => {
      if (err) {
        return next(err)
      }
      const $ = cheerio.load(rs.text)
      let items = [];
      $('#topic_list .cell').each(function (idx, element) {
        const $element = $(element).find('.topic_title').eq(0);
        const $auther = $(element).find('.user_avatar img').eq(0);
        items.push({
          title: $element.attr('title'),
          href: $element.attr('href'),
          author: $auther.attr('title')
        });
      });
      res.send(items)
    })
})
app.listen(3000, () => {
  console.log('爬虫开启在3000端口')
})