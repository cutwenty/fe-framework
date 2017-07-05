// 开启服务
var path = require('path');
var config = require('../config');
var webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf');

var express = require('express');
var webpack = require('webpack');
var proxyMiddleware = require('http-proxy-middleware');

// 获取开启服务的接口
var port = process.env.PORT || config.dev.port;
// 获取协议设置
var proxyTable = config.dev.proxyTable;

var app = express();
var compiler = webpack(webpackConfig);

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
});

var hotMiddleware = require('webpack-hot-middleware')(compiler);
// 当页面内容更新时，强制页面更新
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    // webpack编译结束，会发布事件，浏览器就会刷新
    hotMiddleware.publish({ action: 'reload' });
    cb();
  });
});

// 处理路由代理
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context];
  if (typeof options === 'string') {
    options = { target: options };
  }
  app.use(proxyMiddleware(context, options));
});

// 处理h5的history
app.use(require('connect-history-api-fallback')());

// 开发模式
app.use(devMiddleware);

// 使用热更新中间件
app.use(hotMiddleware);

// 静态文件路由
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);
app.use(staticPath, express.static('./static'));

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at http://localhost:' + port + '\n');
});
