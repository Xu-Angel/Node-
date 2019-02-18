// 第三阶段 引入eventproxy，控制请求并行
 // 文档 https://github.com/JacksonTian/eventproxy#%E9%87%8D%E5%A4%8D%E5%BC%82%E6%AD%A5%E5%8D%8F%E4%BD%9C
// CNode 目前每一页有 40 个主题，于是我们就需要发起 1 + 40 个请求，后者的 40 个请求，我们并发地发起-。-
/**
  * 如果你要并发异步获取两三个地址的数据，并且要在获取到数据之后，对这些数据一起进行利用的话，常规的写法是自己维护一个计数器。
先定义一个 var count = 0，然后每次抓取成功以后，就 count++。如果你是要抓取三个源的数据，由于你根本不知道这些异步操作到底谁先完成，那么每次当抓取成功的时候，就判断一下 count === 3。当值为真时，使用另一个函数继续完成操作。 常规操作：
  */
var eventproxy = require('eventproxy')
  (function () {
    var count = 0
    var result = {}
    $.get('xxx1', rs => {
      result.data1 = rs
      count++
      handle()
    })
    $.get('xxx2', rs => {
      result.data2 = rs
      count++
      handle()
    })
    $.get('xxx3', rs => {
      result.data3 = rs
      count++
      handle()
    })

    function handle() {
      if (count === 3) {
        var html = fuck(result.data1, result.data2, result.data3)
        // do result
        render(html)
      }
    }
  })()

/* 
eventproxy 就起到了这个计数器的作用，它来帮你管理到底这些异步操作是否完成，完成之后，它会自动调用你提供的处理函数，并将抓取到的数据当参数传过来。 骚操作：
*/

var ep = new eventproxy()

// 控制器
ep.all('data1_event', 'data2_event', 'data3_event', (data1, data2, data3) => {
  var html = fuck(data1, data2, data3)
  render(html)
})

// 分发器
$.get('http://data1_source', function (data) {
  ep.emit('data1_event', data);
});

$.get('http://data2_source', function (data) {
  ep.emit('data2_event', data);
});

$.get('http://data3_source', function (data) {
  ep.emit('data3_event', data);
});

// 每次当一个源的数据抓取完成时，就通过 ep.emit() 来告诉 ep 自己，某某事件已经完成了。
// 当三个事件未同时完成时，ep.emit() 调用之后不会做任何事；当三个事件都完成的时候，就会调用末尾的那个回调函数，来对它们进行统一处理。
// 因为我们现在40次请求都是一样的处理逻辑，所以我们这边采用重复异步协作EventProxy.after,具体代码如下：

// 命令 ep 重复监听 topicUrls.length 次（在这里也就是 40 次） `topic_html` 事件再行动
ep.after('topic_html', topicUrls.length, topics => {
  // topics 是个四十次的数据集， 为数组，包含了 40 次 ep.emit('topic_html', pair) 中的那 40 个 pair  

  // 开始行动
  topics = topics.map(topicPair => {
    const topicUrl = topicPair[0];
    const topicHtml = topicPair[1];
    const $ = cheerio.load(topicHtml);
    return ({
      title: $('.topic_full_title').text().trim(),
      href: topicUrl,
      comment1: $('.reply_content').eq(0).text().trim(),
    });
  })
  console.log('final:');
  console.log(topics);
})

// 首页的四十个链接 进行注册分发
topicUrls.forEach(function (topicUrl) {
  superagent.get(topicUrl)
    .end(function (err, res) {
      console.log('fetch ' + topicUrl + ' successful');
      ep.emit('topic_html', [topicUrl, res.text]);
    });
});