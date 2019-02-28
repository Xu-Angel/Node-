// ! 中间件 (pre 和 post 钩子) 是在异步函数执行时函数传入的控制函数。
// ! https://cn.mongoosedoc.top/docs/middleware.html

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
Aggregate 中间件作用于 MyModel.aggregate()， 它会在你对 aggregate 对象调用 exec() 时执行。 对于 aggregate 中间件，this 指向当前aggregation 对象。
aggregate
*/

 /* 
 model 中间件，this 指向当前 model。 Model 中间件支持以下 Model 操作：
insertMany
  */