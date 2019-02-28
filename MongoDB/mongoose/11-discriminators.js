/* 
! Discriminator 是一种 schema 继承机制。 他允许你在相同的底层 MongoDB collection 上 使用部分重叠的 schema 建立多个 model。
// ! https://cn.mongoosedoc.top/docs/discriminators.html
假设你要在单个 collection 中记录多种 event， 每个 event 都有时间戳字段，但是 click 事件还有 URL 字段， 这时你可以用 model.discriminator() 实现上述要求。 此函数接受 2 个参数，model 名称和 discriminator schema， 返回的 model 结合了原 model 的 schema 和 discriminator schema。
*/