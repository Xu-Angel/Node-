const redis = require("redis"),
  client = redis.createClient(6379, '127.0.0.1');
// if you'd like to select database 3, instead of 0 (default), call
// client.select(3, function() { /* ... */ });
client.on("error", function (err) {
  console.log("Error " + err);
});
const {promisify} = require('util');
const getAsync = promisify(client.get).bind(client);
client.set("string key", "string val", redis.print);
client.hset("hash key", "hashtest 1", "some value", redis.print);
client.hset(["hash key", "hashtest 2", "some other value"], redis.print);
client.hkeys("hash key", function (err, replies) {
  console.log(replies.length + " replies:");
  replies.forEach(function (reply, i) {
    console.log("    " + i + ": " + reply);
  });
});
 getAsync('string key').then(function(res) {
  console.log(res); // => 'bar'
 });
client.lpush('List', 'List \'s value', v => {
  console.log(v);
})
client.sadd('Set', 'o', redis.print)
// 第二次元素会被忽略（集合内元素唯一性）
client.sadd('Set', 'o', redis.print)
  // client.quit();
