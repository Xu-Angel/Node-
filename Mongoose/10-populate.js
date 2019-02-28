// ! Populate（填充）
/* 
MongoDB 3.2 之后，也有像 sql 里 join 的聚合操作，那就是 $lookup 而 Mongoose，拥有更强大的 populate()，可以让你在别的 collection 中引用 document。
*/
/* 
Population 可以自动替换 document 中的指定字段，替换内容从其他 collection 获取。 我们可以填充（populate）单个或多个 document、单个或多个纯对象，甚至是 query 返回的一切对象。 下面我们看看例子
 */

var mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/students", {useNewUrlParser: true})
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
    author: author._id    // assign the _id from the person
  });

  story1.save(function (err) {
    if (err) return handleError(err);
    // thats it!
  });
});