// 打包项目运行的入口文件

// shelljs，可以在代码中执行控制台指令
require('shelljs/global');
// 项目环境
env.NODE_ENV = 'production';

var path = require('path');
// 控制台的loading图标
var ora = require('ora');
var webpack = require('webpack');
// 获取项目配置信息
var config = require('../config');
// 获取production环境下，webpack配置
var webpackConfig = require('./webpack.prod.conf');

console.log(
  '  Tip:\n' +
  '  Built files are meant to be served over an HTTP server.\n' +
  '  Opening index.html over file:// won\'t work.\n'
);

// 显示loading
var spinner = ora('building for production...');
spinner.start();

// 获取静态资源存放路径
var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory);
// js、css会编译到assetPath下，根目录的static文件夹，也会复制到assetPath下
// 每次build，都会清空assetPath
rm('-rf', assetsPath);
mkdir('-p', assetsPath);
// 将static文件夹，复制到assetPath下
cp('-R', 'static/', assetsPath);

webpack(webpackConfig, function (err, stats) {
  // 关闭loading
  spinner.stop();
  if (err) throw err;
  // 控制台输出打包模块信息
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n');
});
