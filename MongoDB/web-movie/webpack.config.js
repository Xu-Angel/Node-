var webpack = require('webpack'),
    // 使用插件将组件中相同部分抽成一个单独文件
    CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin,
    // JS压缩插件
    uglifyJsPlugin = webpack.optimize.UglifyJsPlugin,
    path = require('path');

module.exports = {
  entry: {
    'movieBundle': [
      './public/scripts/components/movie/movie_index'      // 引入电影首页JS脚本
    ],
    'musicBundle': [
      './public/scripts/components/music/music_index'      // 引入音乐首页JS脚本
    ]
  },
  output: {
    path: path.join(__dirname, '/public/libs/scripts/components/'),  // 输出JS路径
    filename: '[name].min.js'
  },
  module: {
    loaders: [
      {
        test: /\.js[x]?$/,                           // 对ES6和React进行转换
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'env', 'stage-2']
        }
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']           // 识别文件后缀名
  },
  plugins: [
    // 使用插件将组件中相同部分抽成一个单独文件
    new CommonsChunkPlugin({
      name: "commons",
      // ( 公共chunk(commnons chunk) 的名称)
      filename: "componentInit.min.js"
      // ( 公共chunk 的文件名)
    }),
    // JS代码压缩
    new uglifyJsPlugin({
      compress: { warnings: false }
    })
  ]
};
