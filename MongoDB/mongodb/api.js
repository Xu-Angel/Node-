
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

// 连接
MongoClient.connect('mongodb://localhost:27017', (err, client) => {
  assert.equal(null, err)
  console.log('连接客户端成功');
  const db = client.db('mongodb')
  console.log('连接mongo数据库成功');
  insertDocuments(db, rs => {
    indexCollection(db, function() {
      // client.close();
      console.log('索引构建完成');
    });
    console.log('输出', rs);
    // client.close()
    // console.log('客户端已经关闭');
  })
  findDocuments(db, rs => {
    console.log('数据：', rs);
    // client.close()
    // console.log('客户端已经关闭');
  })
  updateDocument(db, rs => {
    console.log('更新数据：', rs);
    // client.close()
    // console.log('客户端已经关闭');
  })
  findAllDocuments(db, rs => {
    console.log('查询所有数据：', rs);
    // client.close()
    // console.log('客户端已经关闭');
  })
  removeDocument(db, rs => {
    console.log('最后数据：', rs);
    client.close()
    console.log('客户端已经关闭');
  })
})

// 插入基本数据
const insertDocuments = (db, callback) => {
  // 获取基本数据集合  - 表
  const collection = db.collection('documents')
  // 插入一些基本数据
  collection.insertMany([
    {a : 1}, {a : 2}, {a : 3}
  ], (err, rs) => {
      assert.equal(err, null)
      assert.equal(3, rs.result.n)
      assert.equal(3, rs.ops.length)
      console.log('插入 三个基本数据 到表中了');
      callback(rs)
  })
}

// 查询所有数据
const findAllDocuments = (db, callback) => {
  // 获取基本数据集合  - 表
  const collection = db.collection('documents')
  // 插入一些基本数据
  collection.find({}).toArray((err, rs) => {
    assert.equal(err, null)
    console.log('正在查找');
    callback(rs)
  })
}

// 筛选数据
const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('documents');
  // Find some documents
  collection.find({'a': 3}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs);
    callback(docs);
  });
}

// 更新一个数据
const updateDocument = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('documents');
  // Update document where a is 2, set b equal to 1
  collection.updateOne({ a : 2 }
    , { $set: { b : 1 } }, function(err, result) { // 添加了一个b字段进去
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("Updated the document with the field a equal to 2");
    callback(result);
  });
}

// 删除一个数据
const removeDocument = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('documents');
  // Delete document where a is 3
  collection.deleteOne({ a : 3 }, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("Removed the document with the field a equal to 3");
    callback(result);
  });
}

// 表索引
const indexCollection = function(db, callback) {
  db.collection('documents').createIndex(
    { "a": 1 },
      null,
      function(err, results) {
        console.log(results);
        callback();
    }
  );
};