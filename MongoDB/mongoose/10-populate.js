// ! Populate（填充） 联表操作
/* 
MongoDB 3.2 之后，也有像 sql 里 join 的聚合操作，那就是 $lookup 而 Mongoose，拥有更强大的 populate()，可以让你在别的 collection 中引用 document。
*/
/* 
Population 可以自动替换 document 中的指定字段，替换内容从其他 collection 获取。 我们可以填充（populate）单个或多个 document、单个或多个纯对象，甚至是 query 返回的一切对象。 下面我们看看例子
 */

var mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/students", { useNewUrlParser: true })
var Schema = mongoose.Schema;

var personSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  age: Number,
  stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});

var storySchema = Schema({
  author: { type: Schema.Types.ObjectId, ref: 'Person' },
  title: String,
  fans: [{ type: Schema.Types.ObjectId, ref: 'Person' }]
});

var Story = mongoose.model('Story', storySchema);
var Person = mongoose.model('Person', personSchema);
// ! ref 
/* 
现在我们创建了两个 Model。Person model 的 stories 字段设为 ObjectId数组。 ref 选项告诉 Mongoose 在填充的时候使用哪个 model，本例中为 Story model。 所有储存在此的 _id 都必须是 Story model 中 document 的 _id。
注意: ObjectId、Number、String 以及 Buffer 都可以作为 refs 使用。 但是最好还是使用 ObjectId，除非你是进阶玩家，并且有充分理由使用其他类型 作为 refs。
*/

// ! 保存refs 保存 refs 与保存普通属性一样，把 _id 的值赋给它就好了：

var author = new Person({
  _id: new mongoose.Types.ObjectId(),
  name: 'Ian Fleming',
  age: 50
});

author.save(function (err) {
  if (err) return handleError(err);

  var story1 = new Story({
    title: 'Casino Royale',
    author: author._id // assign the _id from the person
  });

  story1.save(function (err) {
    if (err) return handleError(err);
    // thats it!
  });
});

/* 
! 连表实例
*/
// 其中，category的model如下所示
const CategorySchema = new Schema({
  number: { type: Number, required: true, index: true, unique: true, min: [1000000000, '位数不足'], max: [9999999999, '位数过长'] },
  name: { type: String, required: true, validate: { validator: (v) => v.trim().length, message: '名称不能为空' } },
  description: { type: String },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  recommend: { type: Boolean },
  index: { type: Number }
}, { timestamps: true })

// post的model如下所示
const PostSchema = new Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String },
  content: { type: String },
  category: { type: Schema.Types.ObjectId, ref: 'Category', index: true },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  likes: [{ type: Schema.Types.ObjectId, ref: 'Like' }],
  imgUrl: { type: String },
  recommend: { type: Boolean },
  index: { type: Number }
}, {
  timestamps: true
})

// ! 在对类别的操作中， 都需要使用populate操作符显示出所包括的posts中的title
/* 新增一个类别 */
app.post('/categories', adminAuth, (req, res) => {
  new Category(req.body).save((err, doc) => {
    if (err) return res.status(500).json({ code: 0, message: err.message, err })
    doc.populate({ path: 'posts', select: 'title' }, (err, doc) => { // ! 从自己表的字段进行操作 触发 去到 post 表进行操作
      if (err) return res.status(500).json({ code: 0, message: err.message, err })
      return res.status(200).json({ code: 1, message: '新增成功', result: { doc } })
    })
  })
})

// 在对文章的操作中，则需要显示出类别category的number属性
/* 按照id加载一篇文章 */
app.get('/posts/:id', (req, res) => {
  Post.findById(req.params.id).populate('category', 'number').exec((err, doc) => {
    if (err) return res.status(500).json({ code: 0, message: err.message, err })
    if (doc === null) return res.status(404).json({ code: 0, message: '文章不存在' })
    return res.status(200).json({ code: 1, message: '获取文章成功', result: { doc } })
  })
})

/* 加载所有文章 */
app.get('/posts', (req, res) => {
  Post.find().select("title likes comments recommend imgUrl index").populate('category', 'number').sort("-createdAt").exec((err, docs) => {
    if (err) return res.status(500).json({ code: 0, message: err.message, err })
    return res.status(200).json({ code: 1, message: '获取文章成功', result: { docs } })
  })

  // 在新增、更新和删除文章的操作中，都需要重建与category的关联
  // 关联category的posts数组
  fnRelatedCategory = _id => {
    Category.findById(_id).exec((err, categoryDoc) => {
      if (err) return res.status(500).json({ code: 0, message: err.message, err })
      if (categoryDoc === null) return res.status(404).json({ code: 0, message: '该类别不存在，请刷新后再试' })
      Post.find({ category: _id }).exec((err, postsDocs) => {
        if (err) return res.status(500).json({ code: 0, message: err.message, err })
        categoryDoc.posts = postsDocs.map(t => t._id)
        categoryDoc.save(err => {
          if (err) return res.status(500).json({ code: 0, message: err.message, err })
        })
      })
    })
  }
})

/* 按照id更新一篇文章 */
app.put('/posts/:id', adminAuth, (req, res) => {
  Post.findById(req.params.id).exec((err, doc) => {
    if (err) return res.status(500).json({ code: 0, message: err.message, err })
    if (doc === null) return res.status(404).json({ code: 0, message: '文章不存在，请刷新后再试' })
    for (prop in req.body) {
      doc[prop] = req.body[prop]
    }
    doc.save((err) => {
      if (err) return res.status(500).json({ code: 0, message: err.message, err })
      doc.populate({ path: 'category', select: 'number' }, (err, doc) => {
        if (err) return res.status(500).json({ code: 0, message: err.message, err })
        fnRelatedCategory(doc.category._id)
        return res.status(200).json({ code: 1, message: '更新成功', result: { doc } })
      })
    })
  })
})