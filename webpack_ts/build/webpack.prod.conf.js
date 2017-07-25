// production环境的webpack配置
var path = require('path');
// 项目配置
var config = require('../config');
// 基本的webpack配置
var baseWebpackConfig = require('./webpack.base.conf');
// utils工具方法
var utils = require('./utils');

var webpack = require('webpack');
var merge = require('webpack-merge');
// 从打包的文件中提前样式，并放到独立的文件
var ExtractTextPlugin = require('extract-text-webpack-plugin');
// 生成html文件
var HtmlWebpackPlugin = require('html-webpack-plugin');

// 判断是测试、还是产品环境，获取环境配置
// 测试暂时还未添加
// process.env.NODE_ENV在build、dev-server中设置
var env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : config.build.env;
// 使用webpack-merge，合并webpack配置
var webpackConfig = merge(baseWebpackConfig, {
  target: 'web',
  module: {
    rules: utils.styleLoaders({ sourceMap: config.build.productionSourceMap, extract: true })
  },
  // 产品环境使用source-map
  // source-map - 生成完整的 SourceMap，输出为独立文件。由于在 bundle 中添加了引用注释，所以开发工具知道在哪里去找到 SourceMap
  // 如果使用了UglifyJsPlugin，在UglifyJsPlugin里同样要设置sourceMap: true
  devtool: config.build.productionSourceMap? '#source-map': false,
  // production环境，输出的文件名，需要按照需求加上子路径
  output: {
    // filename选项，作用于每个入口文件
    // [name] 被 chunk 的 name 替换。
    // [hash] 被 compilation 生命周期的 hash 替换。
    // [chunkhash] 被 chunk 的 hash 替换。
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    // [id] 被 chunk 的 id 替换。
    // [name] 被 chunk 的 name 替换（或者，在 chunk 没有 name 时使用 id 替换）。
    // [hash] 被 compilation 生命周期的 hash 替换。
    // [chunkhash] 被 chunk 的 hash 替换。
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    // 定义编译时使用的全局常量
    // name: value
    new webpack.DefinePlugin({
      'process.env': utils.stringify(env)
    }),
    // 压缩js代码
    new webpack.optimize.UglifyJsPlugin({
      // sourcemap，在devtool设置后，在此处也要设置
      sourceMap: config.build.productionSourceMap,
      compress: {
        warnings: false
      }
    }),
    // webpack为每个模块指定唯一的id，通过该插件，webpack会分析和为模块按优先级排序，为最经常使用的分配一个最小的ID
    new webpack.optimize.OccurrenceOrderPlugin(),
    // 提取出样式文件到独立的文件
    // [name] chunk 的名称
    // [id] chunk 的数量
    // [contenthash] 提取文件根据内容生成的哈希
    new ExtractTextPlugin(utils.assetsPath('css/[name].[contenthash].css')),
    // 生成html文件，输入js、css引用标签
    // 要生成多个html文件，可以在plugins中new多个HtmlWebpackPlugin
    new HtmlWebpackPlugin({
      // 文件生成目标路径
      filename: process.env.NODE_ENV === 'testing'
        ? 'index.html'
        : config.build.index,
      // 模板html
      template: 'index.html',
      // 是否在html中插入asset资源
      // true | 'head' | 'body' | false
      inject: true,
      // 插入到html中的favicon的路径
      // favicon: '',
      // html内容规范化规则
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        minifyJS: true,
        minifyCSS: true
      },
      // 插入资源的顺序规则
      //  'none' | 'auto' | 'dependency' | {function} - default: 'auto'
      chunksSortMode: 'dependency',
      // 不插入的chunks
      // excludeChunks: []
    }),
    // 提取公共js代码，vendor
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // 任意从node_modules中导入的模块，会被放入vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        );
      }
    }),
    // vendor的manifest文件，避免代码变化后，vendor也变化
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    })
  ]
});

// 判断productionGzip，是否压缩打包文件
if (config.build.productionGzip) {
  // CompressionWebpackPlugin将打包的结果，压缩为gzip
  var CompressionWebpackPlugin = require('compression-webpack-plugin');
  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  );
}

module.exports = webpackConfig;
