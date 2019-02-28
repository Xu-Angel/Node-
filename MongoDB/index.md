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

1. 建立Schema
2. 构建model类
3. 实例化一个model类
4. 操作实例
5. MongooseDocuments对象 
   
   mongoose自己封装的一个对象，并且这个对象会对数据进行实时查询以保证其符合预定义的model。所以添加其它model中没有的属性时是无法添加成功的。

    要想添加成功有2种方法：

    查询时添加lean：
    ```
    Model.findOne({}).lean();
    Model.findOne({lean:true},function(err,result){});
    Model.findOne({}).lean().exec(function(err,result){});
    ```
    将查询结果转为object:
    ```
    result.toObject();
    ```
## mongodb

1. 打开 collection (多个基本数据构成的数据表) - 操作
2. document 单个基本数据 - 操作
