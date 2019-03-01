import { SSL_OP_TLS_ROLLBACK_BUG } from "constants";

// Models 是从schema 编译过来的构造函数，它的实例就代表着可以从数据库去保存和读取documents。

// ! 复数 
// 第一个参数是跟 model 对应的集合（ collection ）名字的 单数 形式。 Mongoose 会自动找到名称是 model 名字 复数 形式的 collection 
var Tank = mongoose.model('Tank', schema); // 在数据库对应tanks 这个collection

// ! 如何保存document到数据库 ， 因为Models 的实例是document  所以保存实例就行：
const mongoose = require('mongoose')
const Tank = mongoose.model('Tank', schema)
const tank = new Tank({ size: 'small' })
// tank.xxxx   对tank实例做了很多事情
tank.save(function (err) { // 第一种保存方式  具名实例化后 做完想做的事情后 再保存
  if (err) console.log(err)
})

// 第二种保存方式  model方法
Tank.create({ size: 'small' }, function (err, samll) {
  if (err) return handleError(err)
})
// 第三种保存方式 model方法
Tank.insertMany([{ name: "a" }, { name: "b" }], function (err, samll) {
  if (err) return handleError(err)
})

// ! 两种调用Model 方式
// 1.如果 model 是通过调用 mongoose.model() 生成的，它将使用 mongoose 的默认连接。  
mongoose.connect()
mongoose.model()
// 2. 如果自行创建了连接，就需要使用 connection 的 model() 函数代替 mongoose 的 model() 函数。
var con = mongoose.createConnection()
con.model()

//  ! 查询函数写法
// 1. callback
// 2. .exec

// ! 查询 https://cn.mongoosedoc.top/docs/queries.html
// 1. find
Tank.find({ size: 'small' }).where('createdDate').gt(oneYearAgo).exec(callback)
// 2.findById 
var idArr = []
Tank.find((err, docs) => {
  docs.forEach(v => {
    idArr.push(v._id)
    // --查出所有字段
    // 1.写法
    // Tank.findById(idArr[0], (err, doc) => {
    //   console.log(doc) //{ _id: 5971f93be6f98ec60e3dc86c, name: 'kitty', age: 27 }
    // })
    //2.写法
    Tank.findById(idArr[0]).exec((err, doc) => {
      console.log(doc)
    })
    //-- 输出指定字段
    Tank.findById(idArr[0], { name: 1, _id: 0 }).exec((err, doc) => {
      console.log(doc) // //{  name: 'kitty'}
    })
    //-- 输出最少字段
    Tank.findById(idArr[0], { lean: true }).exec((err, doc) => {
      console.log(doc) // //{  name: 'kitty'}
    })
  })
})
// findOne返回查找到的所有实例的第一个
Tank.findOne({ age: { $gt: 20 } }).exec((err, doc) => {
  console.log(doc) //{ _id: 5971f93be6f98ec60e3dc86c, name: 'kitty', age: 27 }
})

// ! 查询条件
/* 
$or　　　　或关系
$nor　　　 或关系取反
$gt　　　　大于
$gte　　　 大于等于
$lt　　　　小于
$lte　　　 小于等于
$ne　　　　不等于
$in　　　　在多个值范围内
$nin　　　 不在多个值范围内
$all　　　 匹配数组中多个值
$regex　　 正则，用于模糊查询
$size　　　匹配数组大小
$maxDistance　范围查询，距离（基于LBS）
$mod　　　　取模运算
$near　　　 邻域查询，查询附近的位置（基于LBS）
$exists　　 字段是否存在
$elemMatch　匹配内数组内的元素
$within　　　范围查询（基于LBS）
$box　　　　 范围查询，矩形范围（基于LBS）
$center　　　范围醒询，圆形范围（基于LBS）
$centerSphere　范围查询，球形范围（基于LBS）
$slice　　　　查询字段集合中的元素（比如从第几个之后，第N到第M个元素
*/
// ! $where 要进行更复杂的查询，需要使用$where操作符，$where操作符功能强大而且灵活，它可以使用任意的JavaScript作为查询的一部分，包含JavaScript表达式的字符串或者JavaScript函数
// 1. 字符串
Tank.find({ $where: 'this.x == this.y' }).exec((err, docs) => {
  console.log(docs);
  //[ { _id: 5972ed35e6f98ec60e3dc887,name: 'wang',age: 18,x: 1,y: 1 },
  //{ _id: 5972ed35e6f98ec60e3dc889, name: 'li', age: 20, x: 2, y: 2 } ]
})
// 2. 函数
Tank.find({
  $where: function () {
    return this.x !== this.y
  }
}).exec((err, docs) => {
  console.log(docs)
  //[ { _id: 5972ed35e6f98ec60e3dc886,name: 'huochai',age: 27,x: 1,y: 2 },
  //{ _id: 5972ed35e6f98ec60e3dc888, name: 'huo', age: 30, x: 2, y: 1 } ]
})

// ! 删除 
Tank.remove({ size: 'large' }, err => {
  if (err) return handleError(err)
})

// ! 更新 https://cn.mongoosedoc.top/docs/api.html#model_Model.findOneAndUpdate
// https://cn.mongoosedoc.top/docs/api.html#model_Model.update

// 1.  Model.update(conditions, doc, [options], [callback])
/*  safe (boolean)： 默认为true。安全模式。
　　upsert (boolean)： 默认为false。如果不存在则创建新记录。
　　multi (boolean)： 默认为false。是否更新多个查询记录。
　　runValidators： 如果值为true，执行Validation验证。
　　setDefaultsOnInsert： 如果upsert选项为true，在新建时插入文档定义的默认值。
　　strict (boolean)： 以strict模式进行更新。
　　overwrite (boolean)： 默认为false。禁用update-only模式，允许覆盖记录。 \
*/
// ! [注意]update()方法中的回调函数不能省略，否则数据不会被更新。如果回调函数里并没有什么有用的信息，则可以使用exec()简化代码
Tank.update({ name: /aa/ }, { age: 0 }, { upsert: true }).exec();
// ! 查询多个并更新
Tank.update({ name: /a/ }, { age: 10 }, { multi: true }).exec((err, raw) => {
  console.log(raw); //{ n: 2, nModified: 2, ok: 1 }
  // 如果一个都没有满足条件的 则返回 { n: 0, nModified: 0, ok: 1 }
})
// ! 如果设置options里的upsert参数为true，若没有符合查询条件的文档，mongo将会综合第一第二个参数向集合插入一个新的文档
Tank.update({ age: 100 }, { name: "hundred" }, { upsert: true }, function (err, raw) {
  //{ n: 1, nModified: 0,upserted: [ { index: 0, _id: 5972c202d46b621fca7fc8c7 } ], ok: 1 }
  // {objid:xxx, age: 100, name: hundred}
  console.log(raw);
})

// ! updateMany() updateMany()与update()方法唯一的区别就是默认更新多个文档，即使设置{multi:false}也无法只更新第一个文档
// Model.updateMany(conditions, doc, [options], [callback])
// 将数据库中名字中带有'huo'的数据，年龄变为50岁
Tank.updateMany({ name: /huo/ }, { age: 50 }, function (err, raw) {
  //{ n: 2, nModified: 2, ok: 1 }
  console.log(raw);
});
// !更新比较复杂的数据 可以使用find()+save()方法来处理，比如找到年龄小于30岁的数据，名字后面添加'30'字符
Tank.find({ age: { $lt: 20 } }, function (err, docs) {
  //[ { _id: 5971f93be6f98ec60e3dc86d, name: 'wang', age: 10 },
  //{ _id: 5971f93be6f98ec60e3dc86f, name: 'li', age: 12 }]
  console.log(docs);
  docs.forEach(function (item, index, arr) {
    item.name += '30';
    item.save();
  })
  //[ { _id: 5971f93be6f98ec60e3dc86d, name: 'wang30', age: 10 },
  // { _id: 5971f93be6f98ec60e3dc86f, name: 'li30', age: 12 }]
  console.log(docs);
});
// ! updateOne()updateOne()方法只能更新找到的第一条数据，即使设置{multi:true}也无法同时更新多个文档
// 将数据库中名字中带有'huo'的数据，年龄变为60岁
Tank.updateOne({ name: /huo/ }, { age: 60 }, function (err, raw) {
  //{ n: 1, nModified: 1, ok: 1 }
  console.log(raw);
});
// findOne() + save()如果需要更新的操作比较复杂，可以使用findOne()+save()方法来处理，比如找到名字为'huochai'的数据，年龄加100岁
Tank.findOne({ name: 'huochai' }, function (err, doc) {
  //{ _id: 5971f93be6f98ec60e3dc86c, name: 'huochai', age: 10 }
  console.log(doc);
  doc.age += 100;
  doc.save();
  //{ _id: 5971f93be6f98ec60e3dc86c, name: 'huochai', age: 110 }
  console.log(doc);
});

// !fineOneAndUpdate()方法的第四个参数回调函数的形式如下function(err,doc){}
// Model.findOneAndUpdate([conditions], [update], [options], [callback])

// ! fineByIdAndUpdate()方法的第四个参数回调函数的形式如下function(err,doc){}
// Model.findOneAndUpdate([conditions], [update], [options], [callback])

// ! 删除 model.remove(conditions, [callback]) 删除所有数据
Tank.remove({ name: /30/ }).exec()

// ! 删除第一条数据 Model.findOneAndRemove(conditions, [options], [callback])
Tank.findOneAndRemove({ age: { $lt: 20 } }).exec()

// ! 根据id删除 Model.findByIdAndRemove(id, [options], [callback])
var aIDArr = [];
Tank.find(function (err, docs) {
  docs.forEach(function (item, index, arr) {
    aIDArr.push(item._id);
  })
  Tank.findByIdAndRemove(aIDArr[0]).exec()
})

/* 
! 查询后处理
sort     排序
skip     跳过
limit    限制
select   显示字段
exect    执行
count    计数
distinct 去重
*/

// 按age从小到大排序
temp.find().sort("age").exec(function (err, docs) {
  //[ { _id: 5972ed35e6f98ec60e3dc887,name: 'wang',age: 18,x: 1,y: 1 },
  //{ _id: 5972ed35e6f98ec60e3dc889, name: 'li', age: 20, x: 2, y: 2 },
  //{ _id: 5972ed35e6f98ec60e3dc886,name: 'huochai',age: 27,x: 1,y: 2 },
  //{ _id: 5972ed35e6f98ec60e3dc888, name: 'huo', age: 30, x: 2, y: 1 } ]
  console.log(docs);
});

// 按x从小到大，age从大到小排列
temp.find().sort("x -age").exec(function (err, docs) {
  //[ { _id: 5972ed35e6f98ec60e3dc886,name: 'huochai',age: 27,x: 1,y: 2 },
  //{  _id: 5972ed35e6f98ec60e3dc887,name: 'wang',age: 18,x: 1,y: 1 },
  //{ _id: 5972ed35e6f98ec60e3dc888, name: 'huo', age: 30, x: 2, y: 1 },
  //{ _id: 5972ed35e6f98ec60e3dc889, name: 'li', age: 20, x: 2, y: 2 } ]
  console.log(docs);
});

// 跳过1个，显示其他
temp.find().skip(1).exec(function (err, docs) {
  //[ { _id: 5972ed35e6f98ec60e3dc887,name: 'wang',age: 18,x: 1,y: 1 },
  //{ _id: 5972ed35e6f98ec60e3dc888, name: 'huo', age: 30, x: 2, y: 1 },
  //{ _id: 5972ed35e6f98ec60e3dc889, name: 'li', age: 20, x: 2, y: 2 } ]
  console.log(docs);
});

// 显示2个
temp.find().limit(2).exec(function (err, docs) {
  //[ { _id: 5972ed35e6f98ec60e3dc886,name: 'huochai',age: 27,x: 1,y: 2 },
  //{ _id: 5972ed35e6f98ec60e3dc887,name: 'wang',age: 18,x: 1,y: 1 } ]
  console.log(docs);
});

// 显示name、age字段，不显示_id字段
temp.find().select("name age -_id").exec(function (err, docs) {
  //[ { name: 'huochai', age: 27 },{ name: 'wang', age: 18 },{ name: 'huo', age: 30 },{ name: 'li', age: 20 } ]
  console.log(docs);
});
temp.find().select({ name: 1, age: 1, _id: 0 }).exec(function (err, docs) {
  //[ { name: 'huochai', age: 27 },{ name: 'wang', age: 18 },{ name: 'huo', age: 30 },{ name: 'li', age: 20 } ]
  console.log(docs);
});

// 下面将以上方法结合起来使用，跳过第1个后，只显示2个数据，按照age由大到小排序，且不显示_id字段
temp.find().skip(1).limit(2).sort("-age").select("-_id").exec(function (err, docs) {
  //[ { name: 'huochai', age: 27, x: 1, y: 2 },
  //{ name: 'li', age: 20, x: 2, y: 2 } ]
  console.log(docs);
});

// 显示集合temps中的文档数量
temp.find().count(function (err, count) {
  console.log(count); //4
});

// 返回集合temps中的x的值
temp.find().distinct('x', function (err, distinct) {
  console.log(distinct); //[ 1, 2 ]
});