 // 第二阶段 取出每个主题的第一条评论，这就要求我们对每个主题的链接发起请求，并用 cheerio 去取出其中的第一条评论。
 // CNode 目前每一页有 40 个主题，于是我们就需要发起 1 + 40 个请求，后者的 40 个请求，我们并发地发起-。-
 /**
  * 获取主页的40个请求url，来作为后面获取评论的url：
  */
 const cheerio = require('cheerio')
 const superagent = require('superagent')
 const url = require('url')
const cUrl = 'https://cnodejs.org/'
 
 superagent.get(cUrl)
   .end((err, rs) => {
     if (err) {
       return next(err)
     }
     const $ = cheerio.load(rs.text)
     $('#topic_list .topic_title').each(function (idx, element) {
       const $href = $(element).attr('href')
       const href = url.resolve(cUrl, $href)
       // https://nodejs.org/api/url.html#url_url_resolve_from_to
       console.log($href, href);  // /topic/5c440ba76955112b99436f07 https://cnodejs.org/topic/5c440ba76955112b99436f07
     });
   })