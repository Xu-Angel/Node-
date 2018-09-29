//const add = require('./01global')

//如果引入的是js,node,json可以不用写后缀名
/*
*提问：加载本地模块的时候不加路径名会怎样？
*node将试图在$node_path中寻找复合的模块，然后是./node_modules,$home/node_modules
*提问：文件后缀省略node如何查找；
* js,json,node
* */
console.log(add)


