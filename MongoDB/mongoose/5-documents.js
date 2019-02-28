// Mongoose document 代表着 MongoDB 文档的一对一映射。 每个 document 都是他的 Model 的实例。

// ! 检索 https://cn.mongoosedoc.top/docs/queries.html

// ! 更新 Document 更新的方法同样有很多，我们先看看一个传统的实现，使用 findById：
// 在Tank model 上实现一个方法：查找数据并更新
Tank.findById(id, function (err, tank) {
  if (err) return handleError(err)

  tank.size = 'large'
  tank.save(function (err, updateTank) {
    if (err) return handleError(err)
    res.send(updateTank)
  })
})
// .set() 修改方式
Tank.findById(id, function (err, tank) {
  if (err) return handleError(err)
  tank.set({ size: 'large' }) // 
  tank.save(function (err, updateTank) {
    if (err) return handleError(err)
    res.send(updateTank)
  })
})

// ! 直接更新： model.update()

Tank.update({ _id: id }, { $set: { size: 'large' } }, canlback)

// ! 确实需要返回文档 findAndUpdate/Remove 系列静态方法查找并返回最多1个文档