const mongooose = require('mongoose')
const Schema = mongooose.Schema
mongooose.connect('mongodb://127.0.0.1:27017/mongoose-learn', { useNewUrlParser: true })

// ! 中间件 前后钩子 (pre 和 post 钩子) 是在异步函数执行时函数传入的控制函数。
// ! https://cn.mongoosedoc.top/docs/middleware.html
/* 
  init
  validate
  save
  remove
  count
  find
  findOne
  findOneAndRemove
  findOneAndUpdate
  insertMany
  updat
*/
// ! 使用场景
// 中间件对原子化模型逻辑很有帮助。这里有一些其他建议：
// 复杂的数据校验
// 删除依赖文档（删除用户后删除他的所有文章）
// asynchronous defaults
// asynchronous tasks that a certain action triggers

/* document 中间件， this 指向当前 document。 Document 中间件支持以下 document 操作：
init
validate
save
remove */

/* query 中间件，this 指向当前 query。 Query 中间件支持以下 Model 和 Query 操作：

count
find
findOne
findOneAndRemove
findOneAndUpdate
update */

/* 
Aggregate 聚合操作 中间件作用于 MyModel.aggregate()， 它会在你对 aggregate 对象调用 exec() 时执行。 对于 aggregate 中间件，this 指向当前aggregation 对象。
aggregate
*/

/* 
 model 中间件，this 指向当前 model。 Model 中间件支持以下 Model 操作：
insertMany
  */

/* 
! pre()  前置钩子  会覆盖post()
*/

const schema = Schema({
  age: Number,
  name: String,
  x: Number,
  y: Number
})

// schema.pre('find', function (next) {
//   console.log('pre 的前置钩子1')
//   next()
// })

// schema.pre('find', function (next) {
//   console.log('pre 的前置钩子2')
// })
// ! post() post()方法并不是在执行某些操作后再去执行的方法，而在执行某些操作前最后执行的方法，post()方法里不可以使用next()
// schema.post('find', function (docs) {
//   console.log('我是post方法1', docs);
// });
// schema.post('find', function (docs) {
//   console.log('我是post方法2', docs);
// });

const temp = mongooose.model('temp', schema)
temp.remove().exec()
temp.create({ name: 'huochai', age: 27, x: 1, y: 2 }, { name: 'wang', age: 18, x: 1, y: 1 }, { name: 'huo', age: 30, x: 2, y: 1 }, { name: 'li', age: 20, x: 2, y: 2 })
temp.find(function (err, docs) {
  console.log(docs[0])
  /*
  pre 的前置钩子1
  pre 的前置钩子2
  { _id: 5972ed35e6f98ec60e3dc886,name: 'huochai',age: 27,x: 1,y: 2 }
  */
})

// 按age从小到大排序
temp.find({}).sort("age").exec(function (err, docs) {

  console.log('sort age', docs);
});

// 按x从小到大，age从大到小排列
temp.find({}).sort("x -age").exec(function (err, docs) {
  console.log("x -age", docs);
});

// 跳过1个，显示其他
temp.find({}).skip(1).exec(function (err, docs) {

  console.log('skip 1', docs);
});

// 显示2个
temp.find({}).limit(2).exec(function (err, docs) {

  console.log('limit 2', docs);
});


// 显示集合temps中的文档数量
temp.find({}).count(function (err, count) {
  console.log('count', count); //4
});

// 返回集合temps中的x的值
temp.find({}).distinct('x', function (err, distinct) {
  console.log('distinct x', distinct); //[ 1, 2 ]
});