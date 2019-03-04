# douban-movie
首次渲染的HTML页面以pug模板为基础，页面部分组件以React编写挂载。

（实际上改为全React渲染页面也是很容易的）

## 安装工程

- 安装Node.js
- 安装MongoDB
- 安装工程npm依赖：`npm install`

## 启动mongodb服务

- “假数据”已经备份到工程doubanDatabase文件夹，还原这些数据到数据库即可。
  - 参考：`mongorestore -h 127.0.0.1 -d douban "G:\final\douban-React\doubanDatabase\douban"`
- 启动数据库服务以备服务器调用。
  - 参考：`net start mongodb`

## 启动node服务器

- 第一次运行，执行`gulp init` “编译”文件
- 再启动app.js：`node app.js`，即可启动服务器到localhost:3000
- “管理员”账号密码皆为1234，可访问到后台页面。