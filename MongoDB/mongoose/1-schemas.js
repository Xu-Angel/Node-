const mongoose = require('mongoose')
const Schema = mongoose.Schema
const db = mongoose.createConnection('mongodb://127.0.0.1:27017/mongoose-learn', {useNewUrlParser: true})

// 定义字段
/* 
允许使用的 SchemaTypes 有:
String
Number
Date
Buffer
Boolean
Mixed
ObjectId
Array
Decimal128
*/
const blogSchema = new Schema({
  title: String,
  author: String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now }, // 缺省值
  hidden: Boolean,
  meta: {
    votes: Number,
    favs: Number
  },
  bio: {type: String, match: /[a-z]/} // 正则
})

// ! setter 
blogSchema.path('title').set(v => v.trim())

// ! 中间件 middleware
blogSchema.pre('save', next => {
  // do some thing
  notify(this.get('email'))
  next()
})

// 建立之后还想添加字段？ 使用Schema.add
// !index 索引设置在  Schema 中定义索引。索引分字段级别和schema级别， 复合索引 需要在 schema 级别定义。

const aniSchema = new Schema({
  name: String,
  type: String,
  tags: {type: [String], index: true}  // field level 字段级别
})
aniSchema.index({ name: 1, type: -1 }) // schema 级别
// 应用启动时， Mongoose 会自动调用 createIndex 初始化你定义的索引。 Mongoose 顺序处理每一个 createIndex ，然后在model触发 'index' 事件。
// 自定义索引触发
/* 
mongoose.connect('mongodb://user:pass@localhost:port/database', { autoIndex: false });
// or
mongoose.createConnection('mongodb://user:pass@localhost:port/database', { autoIndex: false });
// or
animalSchema.set('autoIndex', false);
// or
new Schema({..}, { autoIndex: false });
 */

// !添加方法
aniSchema.methods.findAniTypes = function (type, cb) {
  return this.model('Animal').find({type}, cb)
}

// !添加静态方法  给model  添加
aniSchema.statics.findByName = function (name, cb) {
  return this.find({name: new RegExp(name, 'i')}, cb)
}
// !添加方法到query上(bind) 拓展链式查询
aniSchema.query.byName = function (name) {
  return this.find({name: new RegExp(name, 'i')})
}

// !虚拟值（Virtual）  Virtuals 是 document 的属性，但是不会被保存到 MongoDB。 getter 可以用于格式化和组合字段数据， setter 可以很方便地分解一个值到多个字段。
// 使用virtual property getter， 这个方法允许你定义一个 fullName 属性，但不必保存到数据库。
aniSchema.virtual('full').get(function () {
  return this.type  + ':' + this.name
})

// 建表 创建model 
const Animal = db.model('Animal', aniSchema)
const fido = new Animal({ type: 'dog', name: 'fido' }) // 实体（数据）方法
const kitty = new Animal({ type: 'dog', name: 'kitty' }) // 实体（数据）方法

fido.save()
kitty.save()

fido.findAniTypes('dog', function (err, dogs) {
  console.log(dogs, 'entity');
})

Animal.findByName('fido', function (err, animals) {  //  表（整体查找） 方法
  console.log(animals, 'model');
})

Animal.find().byName('fido').exec(function (err, animals) {  // 本表下find方法扩展
  console.log(animals, 'queryMethod')
})

console.log(fido.full, 'full')  // virtualType  -> dog:fido full  与上面方法不能同时运行 需注释上面方法