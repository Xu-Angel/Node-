import { SSL_OP_TLS_ROLLBACK_BUG } from "constants";

// Models 是从schema 编译过来的构造函数，它的实例就代表着可以从数据库去保存和读取documents。

// ! 复数 
// 第一个参数是跟 model 对应的集合（ collection ）名字的 单数 形式。 Mongoose 会自动找到名称是 model 名字 复数 形式的 collection 
var Tank = mongoose.model('Tank', schema); // 在数据库对应tanks 这个collection

// ! 如何保存document到数据库 ， 因为Models 的实例是document  所以保存实例就行：

const Tank = mongoose.model('Tank', schema)
const tank = new Tank({ size: 'small' })
// tank.xxxx   对tank实例做了很多事情
tank.save(function (err) {    // 第一种保存方式  具名实例化后 做完想做的事情后 再保存
  if (err) console.log(err)
})

Tank.create({ size: 'small' }, function (err, samll) {  // 第二种保存方式  匿名构造后保存
  if (err) return handleError(err)
})

// ! 两种调用Model 方式
// 1.如果 model 是通过调用 mongoose.model() 生成的，它将使用 mongoose 的默认连接。  
mongoose.connect()
mongoose.model()
// 2. 如果自行创建了连接，就需要使用 connection 的 model() 函数代替 mongoose 的 model() 函数。
var con = mongoose.createConnection()
con.model()

// ! 查询 https://cn.mongoosedoc.top/docs/queries.html
Tank.find({ size: 'small' }).where('createdDate').gt(oneYearAgo).exec(callback)

// ! 删除 
Tank.remove({ size: 'large' }, err => {
  if (err) return handleError(err)
})

// ! 更新 https://cn.mongoosedoc.top/docs/api.html#model_Model.findOneAndUpdate
// https://cn.mongoosedoc.top/docs/api.html#model_Model.update
Tank.update()
Tank.findOneAndUpdate()