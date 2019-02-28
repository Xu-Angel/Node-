// ! 连接
mongoose.connect('mongodb://localhost/myapp');

// 你也可以在 uri 中指定多个参数：
mongoose.connect('mongodb://username:password@host:port/database?options...');

// ! 多个连接
// 之前我们了解如何使用 Mongoose 默认连接方法连接到 MongoDB。但有时候我们需要权限不同的多个连接， 或是连接到不同数据库。这个情况下我们可以使用 mongoose.createConnection()， 它接受之前提到的所有参数，给你返回一个新的连接。
mongoose.createConnection()

// ! 连接池
// 无论是使用 mongoose.connect 或是 mongoose.createConnection 创建的连接， 都被纳入默认最大为 5 的连接池，可以通过 poolSize 选项调整：

// With object options
mongoose.createConnection(uri, { poolSize: 4 });

const uri = 'mongodb://localhost/test?poolSize=4';
mongoose.createConnection(uri);


// !操作缓存
/* 
Mongoose 会缓存你的 model 操作。这个操作很方便，但也回引起一些疑惑, 因为如果你没连上 ，Mongoose 不会 抛错
var MyModel = mongoose.model('Test', new Schema({ name: String }));
连接成功前操作会被挂起
MyModel.findOne(function(error, result) {  ...  });
setTimeout(function() {
  mongoose.connect('mongodb://localhost/myapp');
}, 60000);
要禁用缓存，请修改 bufferCommands 配置。 如果你打开了 bufferCommands 连接被挂起，尝试关闭 bufferCommands 检查你是否正确打开连接。 你也可以全局禁用 bufferCommands ：
mongoose.set('bufferCommands', false);
*/

// ! 选项
// connect 方法也接受 options 参数，这些参数会传入底层 MongoDB 驱动。
// https://cn.mongoosedoc.top/docs/connections.html
const options = {
  useMongoClient: true,
  autoIndex: false, // Don't build indexes
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0
};
mongoose.connect(uri, options);

// ! 回调
mongoose.connect(uri, options, function(error) {
  // Check error in initial connection. There is no 2nd param to the callback.
});

// Or using promises
mongoose.connect(uri, options).then(
  () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
  err => { /** handle initial connection error */ }
);