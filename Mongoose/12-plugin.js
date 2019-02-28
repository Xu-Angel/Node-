
/* 
Schema 是可拓展的，你可以用打包好的功能拓展你的 Schema。这是一个很实用的特性。
*/
/* 试想下数据库里有很多个 collection，我们需要对它们都添加 记录“最后修改”的功能。使用插件，我们很容易做到。 创建一次插件，然后应用到每个 Schema 就好了。 */
// ! 局部插件
// lastMod.js
module.exports = exports = function lastModifiedPlugin (schema, options) {
  schema.add({ lastMod: Date });

  schema.pre('save', function (next) {
    this.lastMod = new Date();
    next();
  });

  if (options && options.index) {
    schema.path('lastMod').index(options.index);
  }
}

// game-schema.js
var lastMod = require('./lastMod');
var Game = new Schema({ ... });
Game.plugin(lastMod, { index: true });

// player-schema.js
var lastMod = require('./lastMod');
var Player = new Schema({ ... });
Player.plugin(lastMod);
// 这样就已经在 Game 和 Player 添加了记录最后修改功能， 同时对 game 的 lastMod 添加索引。这寥寥几行代码，看起来不错。

// ! 全局插件
// 想对所有 schema 注册插件？可以使用 mongoose 单例提供的 .plugin() 函数，请看例子：

var mongoose = require('mongoose');
mongoose.plugin(require('./lastMod'));

var gameSchema = new Schema({ ... });
var playerSchema = new Schema({ ... });
// `lastModifiedPlugin` gets attached to both schemas
var Game = mongoose.model('Game', gameSchema);
var Player = mongoose.model('Player', playerSchema);