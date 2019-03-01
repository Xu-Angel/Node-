## 概念

- document 一份份基本的数据
- collection 多份基本数据的集合 - 官方mongodb声明的'表'
- Model 表的构造函数 - mongoose 中的构造表用的'类'
- schema 表的字段对象

## 链接

[mongoose驱动仓库](https://github.com/Automattic/mongoose)

[mongoose驱动Api例子]([https://github.com/Automattic/mongoose](https://github.com/Automattic/mongoose/blob/master/examples/README.md))

[mongoodb驱动仓库](https://github.com/mongodb/node-mongodb-native)

## mongoose

  **特点：用关系型数据库的思想设计非关系型数据库**
   
1. 建立Schema
2. 构建model类
3. 实例化一个model类
4. 操作实例，对于操作 只要是返回mongoose的查询对象都可以用exec()执行简写
5. MongooseDocuments对象 
   
   mongoose自己封装的一个对象，并且这个对象会对数据进行实时查询以保证其符合预定义的model。所以添加其它model中没有的属性时是无法添加成功的。

    要想添加成功有2种方法：

    查询时添加lean：
    ```js
    Model.findOne({}).lean();
    Model.findOne({lean:true},function(err,result){});
    Model.findOne({}).lean().exec(function(err,result){});
    ```
    将查询结果转为object:
    ```js
    result.toObject();
    ```
6. 查询条件

 - 基本查询条件 
     ```css
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
    ```
 -  $where 查询条件
  
    如果要进行更复杂的查询，需要使用`$where`操作符，`$where`操作符功能强大而且灵活，它可以使用任意的JavaScript作为查询的一部分，包含JavaScript表达式的字符串或者JavaScript函数

7. 文档更新
    - update()
    - updateMany()
    - find() + save()
    - updateOne()
    - findOne() + save()
    - findByIdAndUpdate()
    - fingOneAndUpdate()
    - 
8. 文档删除
    - remove() 

       remove有两种形式，一种是文档的remove()方法，一种是Model的remove()方法

       - model.remove(conditions, [callback])
       - document.remove([callback])
    - findOneAndRemove()
    - findByIdAndRemove()
  
9. 前后钩子
    - pre()
    - post()
    - 支持钩子的操作
      - init
      - validate
      - save
      - remove
      - count
      - find
      - findOne
      - findOneAndRemove
      - findOneAndUpdate
      - insertMany
      - update

10. 查询后处理
    - sort     排序
    - skip     跳过
    - limit    限制
    - select   显示字段
    - exect    执行
    - count    计数
    - distinct 去重
11. 文档验证
    
    文档验证在SchemaType中定义，格式为：{name: {type: String,  validator: value}}
    - required: 数据必须填写
    - default: 默认值
    - validate: 自定义匹配
    - min: 最小值(只适用于数字)
    - max: 最大值(只适用于数字)
    - match: 正则匹配(只适用于字符串)
    - enum:  枚举匹配(只适用于字符串)
## mongodb

1. 打开 collection (多个基本数据构成的数据表) - 操作
2. document 单个基本数据 - 操作
