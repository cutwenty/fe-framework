var merge = require('webpack-merge');
var prodEnv = require('./prod.env');

// 使用webpack-merge合并配置，可以避免配置文件越来越臃肿
module.exports = merge(prodEnv, {
  'NODE_ENV': 'development'
});
