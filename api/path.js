var path = require("path"); //路径相关的操作

console.log(path.dirname(__filename));//获取目录
console.log(path.basename(__filename));//获取文件名.扩展名
console.log(path.basename(__filename, path.extname(__filename)));//获取文件名
console.log(path.extname(__filename));//获取扩展名
console.log(path.format({ root: 'e:\\',
dir: 'e:\\GitKraken\\pratciceShow\\整理旧时候\\node\\day01',
base: '03path.js',
ext: '.js',
name: '03path' }));
console.log(path.parse(__filename));//将一个路径转化成js对象

// path.format();//将js对象转换成路径
console.log(path.join(__dirname,"node_nodules","01global.json"));//拼接多个路径成一个路径，使用广泛


// POSIX 和 Windows 返回的basename会不同
// 如果需要统一-->命名空间
path.posix.basename(__filename)
path.win32.basename(__filename)

// 是否为绝对路径
console.log(path.isAbsolute('\\\\server'),
path.isAbsolute('//server'),
path.isAbsolute('c:/server'),
path.isAbsolute('/server'),
  path.isAbsolute('server/detail'));

// 路径序列化  window 首选分隔符（\）
// 提供平台特定的路径片段分隔符：
// Windows 上是 \。
// POSIX 上是 /。
// 在 Windows 上，正斜杠（/）和反斜杠（\）都被接受为路径片段分隔符。 但是，path 方法只添加反斜杠（\）
console.log(path.normalize('c:////temp\\\\/\\/\\/foo/bar'));  // c:\temp\foo\bar

// 绝对路径 -构造
// 给定的路径序列从右到左进行处理，每个后续的 path 前置，直到构造出一个绝对路径。 例如，给定的路径片段序列：/foo、/bar、baz，调用 path.resolve('/foo', '/bar', 'baz') 将返回 /bar/baz。
// 如果在处理完所有给定的 path 片段之后还未生成绝对路径，则再加上当前工作目录。
path.resolve('/foo/bar', './baz');
// 返回: '/foo/bar/baz'
path.resolve('/foo/bar', '/tmp/file/');
// 返回: '/tmp/file'
path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif');
// 如果当前工作目录是 /home/myself/node，
// 则返回 '/home/myself/node/wwwroot/static_files/gif/image.gif'
console.log(path.resolve());