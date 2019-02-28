// Model 的多个静态辅助方法都可以查询文档。

// ! Model 的方法中包含查询条件参数的（ find findById count update ）都可以按以下两种方式执行：
// 传入 callback 参数，操作会被立即执行，查询结果被传给回调函数（ callback ）。
// 不传 callback 参数，Query 的一个实例（一个 query 对象）被返回，这个 query 提供了构建查询器的特殊接口。
// ! Query 实例有一个 .then() 函数，用法类似 promise。

// ! 如果执行查询时传入 callback 参数，就需要用 JSON 文档的格式指定查询条件。JSON 文档的语法跟 MongoDB shell 一致。

// ! 1 - 传入callback

const Person = mongooose.model('Person', personSchema)
// 查询每个 last name 是 'Ghost' 的 person， select `name` 和 `occupation` 字段
Person.findOne({ 'name.last': 'Ghost' }, 'name occupation', function (err, person) {
  if (err) return handleError(err);
  // Prints "Space Ghost is a talk show host".
  console.log('%s %s is a %s.', person.name.first, person.name.last,
    person.occupation);
});
// ! 上例中查询被立即执行，查询结果被传给回调函数。Mongoose 中所有的回调函数都使用 callback(error, result) 这种模式。如果查询时发生错误，error 参数即是错误文档， result 参数会是 null。如果查询成功，error 参数是 null，result 即是查询的结果。
// Mongoose 中每一处查询，被传入的回调函数都遵循 callback(error, result) 这种模式。查询结果的格式取决于做什么操作： findOne() 是单个文档（有可能是 null ），find() 是文档列表， count() 是文档数量，update() 是被修改的文档数量。 Models API 文档中有详细描述被传给回调函数的值。

// ! 2 - 不传入callback  -- 逐步执行
// 查询每个 last name 是 'Ghost' 的 person
var query = Person.findOne({ 'name.last': 'Ghost' });
// select `name` 和 `occupation` 字段
query.select('name occupation');
// 然后执行查询
query.exec(function (err, person) {
  if (err) return handleError(err);
  // Prints "Space Ghost is a talk show host."
  console.log('%s %s is a %s.', person.name.first, person.name.last,
    person.occupation);
});
// ! - 2-1 不穿入callback - 链式调用
// With a JSON doc
Person.
find({
  occupation: /host/,
  'name.last': 'Ghost',
  age: { $gt: 17, $lt: 66 },
  likes: { $in: ['vaporizing', 'talking'] }
}).
limit(10).
sort({ occupation: -1 }).
select({ name: 1, occupation: 1 }).
exec(callback);

// ! 方法操作符 Using query builder
Person.
find({ occupation: /host/ }).
where('name.last').equals('Ghost').
where('age').gt(17).lt(66).
where('likes').in(['vaporizing', 'talking']).
limit(10).
sort('-occupation').
select('name occupation').
exec(callback);

// ! 原始操作符
Person.find({ age: { $lt: 1000 } }).exec() // 在person表查找小于1000岁的人

// ! Documents  转JS Obj 
// mongoose自己封装的一个对象，并且这个对象会对数据进行实时查询以保证其符合预定义的model。所以添加其它model中没有的属性时是无法添加成功的。

// 要想添加成功有2种方法：

// 查询时添加lean，
// Model.findOne({}).lean();
// Model.findOne({lean:true},function(err,result){});
// Model.findOne({}).lean().exec(function(err,result){});
// 将查询结果转为object，查询结果result.toObject();
