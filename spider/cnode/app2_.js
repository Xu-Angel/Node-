
// 第二阶段完整代码 一次性发 40 个并发请求出去
const eventproxy = require('eventproxy');
const superagent = require('superagent');
const cheerio = require('cheerio');
const url = require('url');

const cnodeUrl = 'https://cnodejs.org/';

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

    const ep = new eventproxy();

    ep.after('topic_html', topicUrls.length, function (topics) {
    topics = topics.map(function (topicPair) {
        const topicUrl = topicPair[0];
        const topicHtml = topicPair[1];
        const $ = cheerio.load(topicHtml);
        return ({
        title: $('.topic_full_title').text().trim(),
        href: topicUrl,
        comment1: $('.reply_content').eq(0).text().trim(),
        });
    });

    console.log('final:');
    console.log(topics);
    });

    topicUrls.forEach(function (topicUrl) {// 四十个 biu~
    superagent.get(topicUrl)
        .end(function (err, res) {
        console.log('fetch ' + topicUrl + ' successful');
        ep.emit('topic_html', [topicUrl, res.text]);
        });
    });
});