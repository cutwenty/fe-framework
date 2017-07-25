// webpack开发模式的配置

var config = require('../config');
var utils = require('./utils');
// 开发模式基于webpack.base
var baseWebpackConfig = require('./webpack.base.conf');
var webpack = require('webpack');
var merge = require('webpack-merge');
// 生成html文件，并注入js、css
var HtmlWebpackPlugin = require('html-webpack-plugin');

var env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : config.dev.env;

// 把dev-client加到，每个入口文件之前执行，让浏览器能监听webpack事件
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name]);
});

module.exports = merge(baseWebpackConfig, {
  // 配置样式加载loader
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // 开发环境使用eval-source-map
  // eval-source-map - 每个模块使用 eval() 执行，并且 SourceMap 转换为 DataUrl 后添加到 eval() 中。初始化 SourceMap 时比较慢，但是会在重构建时提供很快的速度，并且生成实际的文件。行数能够正确映射，因为会映射到原始代码中。
  devtool: '#eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': utils.stringify(env)
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    // 热替换
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    })
  ]
});
