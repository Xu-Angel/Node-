// 子文档是指嵌套在另一个文档中的文档。 在 Mongoose 中，这意味着你可以在里嵌套另一个 schema。 Mongoose 子文档有两种不同的概念：子文档数组和单个嵌套子文档。
var childSchema = new Schema({ name: 'string' });

var parentSchema = new Schema({
  // Array of subdocuments
  children: [childSchema],
  // Single nested subdocuments. Caveat: single nested subdocs only work
  // in mongoose >= 4.2.0
  child: childSchema
});

// 和documents 主要的不同点是 子文档不能单独保存，他们会在他们的顶级文档保存时保存。