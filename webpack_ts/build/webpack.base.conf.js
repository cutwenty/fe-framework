//webpack的基本配置

var path = require('path');
// 项目配置
var config = require('../config');
var utils = require('./utils');
// 项目路径
var projectRoot = path.resolve(__dirname, '../');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  // 入口文件，文件名和路径的键值对
  // 入口文件名: 入口文件路径
  // 多文件入口时，只需要添加各自的键值对
  // entry: {
  //   pageone: './src/page1.js',
  //   pagetwo: './src/page2.js',
  //   pagethree: './src/page3.js'
  // },
  // entry: {[entryChunkName: string]: string|Array<string>}
  entry: {
    main: './src/index.ts'
  },
  // 基本的文件输出路径
  output: {
    // 文件输出路径
    // 默认放在该路径下，根据其他插件选项，路径会不同
    path: config.build.assetsRoot,
    // 输出文件的访问方式
    // production时，publicPath+path，会写到html的标签中
    // development时，可以通过publicPath+filename的url访问文件
    // TODO：文档里没这个，要测试
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    // 文件名，必须是相对路径，不能是绝对路径
    filename: '[name].js'
  },
  // 模块解析配置，方便导入模块
  resolve: {
    // 是否强制要写扩展名，false时，默认扩展名根据extensions判断
    // require('utils') => require('utils.js');
    enforceExtension: false,
    // 自动解析的扩展名
    extensions: ['.ts', '.tsx', '.js', '.json', '.css', '.scss'],
    // 告知webpack解析时，需要搜索的路径
    modules: [
        path.resolve(__dirname, '../src'),
        path.resolve(__dirname, '../node_modules')
    ],
    // 路径替换，例如 src/js/main.js 和 src/tpl/home.html
    // 'tpl': path.resolve(__dirname, '../src/tpl')
    // 此时，import home from '../tpl/home.html';
    // 可以替换为 import home from 'tpl/home.html';
    // 后缀加$，表示精确匹配，使用时，不用加$
    // home$: path.resolve(__dirname, '../src/tpl/home.html')
    // import home from 'home';
    alias: {
      'src': path.resolve(__dirname, '../src')
    }
  },
  // 与resolve相似，用于解析loader模块
  resolveLoader: {
    // 默认是空数组
    // 不想写loader后缀，可以如下配置
    moduleExtensions: ['-loader']
  },
  // 模块加载规则
  module: {
    rules: [
      // 模块加载规则
      // test: '/\.css$/',
      // 使用的loader，每个元素可以是字符串(选项通过?拼接)，可以是对象(自定义一些选项)
      // use: [
      //     'style-loader',
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         modules: true
      //       }
      //     }
      // ]
      {
        test: /\.html$/,
        use: ['raw']
      },
      {
        test: /\.json$/,
        use: ['json']
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel']
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ['babel', 'awesome-typescript-loader']
      },
      // url-loader是file-loader的封装，如果文件小于limit，就会转换为base64，放在js里
      // 其他表现和file-loader一样
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url',
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            loader: 'url',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // 全局模块定义
    // identify: modulePath
    // webpack会根据modulePath导入模块，并赋值给全局变量identify
    new webpack.ProvidePlugin({

    })
  ]
};
