// ! https://cn.mongoosedoc.top/docs/validation.html 中间件，作用于 ScheamType
var schema = new Schema({
  name: {
    type: String,
    required: true
  }
});
var Cat = db.model('Cat', schema);

// This cat has no name :(
var cat = new Cat();
cat.save(function (error) {
  assert.equal(error.errors['name'].message,
    'Path `name` is required.');

  error = cat.validateSync();
  assert.equal(error.errors['name'].message,
    'Path `name` is required.');
});


// ! 内置Validators
/* 
 SchemaTypes 都有内建 required 验证器。required 验证器使用 checkRequired() 函数 判定这个值是否满足 required 验证器
Numbers 有 min 和 max 验证器.
Strings 有 enum、 match、 maxlength 和 minlength 验证器
*/

var breakfastSchema = new Schema({
  eggs: {
    type: Number,
    min: [6, 'Too few eggs'],
    max: 12
  },
  bacon: {
    type: Number,
    required: [true, 'Why no bacon?']
  },
  drink: {
    type: String,
    enum: ['Coffee', 'Tea'],
    required: function () {
      return this.bacon > 3;
    }
  }
});
var Breakfast = db.model('Breakfast', breakfastSchema);

var badBreakfast = new Breakfast({
  eggs: 2,
  bacon: 0,
  drink: 'Milk'
});
var error = badBreakfast.validateSync();
assert.equal(error.errors['eggs'].message,
  'Too few eggs');
assert.ok(!error.errors['bacon']);
assert.equal(error.errors['drink'].message,
  '`Milk` is not a valid enum value for path `drink`.');

badBreakfast.bacon = 5;
badBreakfast.drink = null;

error = badBreakfast.validateSync();
assert.equal(error.errors['drink'].message, 'Path `drink` is required.');

badBreakfast.bacon = null;
error = badBreakfast.validateSync();
assert.equal(error.errors['bacon'].message, 'Why no bacon?');


// ! min | max
var schema = new mongoose.Schema({ age: { type: Number, min: 0, max: 10 }, name: String, x: Number, y: Number });
var temp = mongoose.model('temp', schema);
new temp({ age: 20 }).save(function (err, doc) {
  //Path `age` (20) is more than maximum allowed value (10).
  console.log(err.errors['age'].message);
});

// !match
// 将name的match设置为必须存在'a'字符。如果name不存在'a'，文档将不被保存，且出现错误提示
var schema = new mongoose.Schema({ age: Number, name: { type: String, match: /a/ }, x: Number, y: Number });
var temp = mongoose.model('temp', schema);
new temp({ name: 'bbb' }).save(function (err, doc) {
  //Path `name` is invalid (bbb).
  console.log(err.errors['name'].message);
});

// !enum
// 将name的枚举取值设置为['a','b','c']，如果name不在枚举范围内取值，文档将不被保存，且出现错误提示
var schema = new mongoose.Schema({ age: Number, name: { type: String, enum: ['a', 'b', 'c'] }, x: Number, y: Number });
var temp = mongoose.model('temp', schema);
new temp({ name: 'bbb' }).save(function (err, doc) {
  //`bbb` is not a valid enum value for path `name`.
  console.log(err.errors['name'].message);

});

// ! validate 自定义校验
// validate实际上是一个函数，函数的参数代表当前字段，返回true表示通过验证，返回false表示未通过验证。利用validate可以自定义任何条件。比如，定义名字name的长度必须在4个字符以上
var validateLength = function (arg) {
  if (arg.length > 4) {
    return true;
  }
  return false;
};
var schema = new mongoose.Schema({ name: { type: String, validate: validateLength }, age: Number, x: Number, y: Number });
var temp = mongoose.model('temp', schema);
new temp({ name: 'abc' }).save(function (err, doc) {
  //Validator failed for path `name` with value `abc`
  console.log(err.errors['name'].message);
});