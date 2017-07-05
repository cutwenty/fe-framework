var path = require('path');
var config = require('../config');
// 从html中抽出样式文件的模块
var ExtractTextPlugin = require('extract-text-webpack-plugin');

// 判断NODE_ENV获取assetsSubDirectory，拼接路径
exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory;
  return path.posix.join(assetsSubDirectory, _path);
};

// 获取所有样式loader的use
exports.cssLoaders = function (options) {
  options = options || {};
  // 生成loaders数组
  // 根据options，将样式文件提取出来
  function generateLoaders (loaders) {
    var sourceLoader = loaders.map(function (loaderStr) {
      var result;
      if (/\?/.test(loaderStr)) {
        // 有参数时
        var loader = loaderStr.slice(0, loaderStr.indexOf('?')),
            loaderOptions = getAllParams(loaderStr);
        result = { loader, options: loaderOptions };
      } else {
        // loader没有参数时
        result = { loader: loaderStr };
      }
      if (options.sourceMap) {
        result.options['sourceMap'] = true;
      }
      return result;
    });

    if (options.extract) {
      return ExtractTextPlugin.extract({
        fallback: 'style',
        use: sourceLoader
      });
    } else {
      sourceLoader.unshift('style');
      return sourceLoader;
    }
  }

  return {
    css: generateLoaders(['css?minimize=true&importLoaders=1', 'postcss']),
    postcss: generateLoaders(['css?minimize=true&importLoaders=1', 'postcss']),
    less: generateLoaders(['css?minimize=true&importLoaders=2', 'postcss', 'less']),
    sass: generateLoaders(['css?minimize=true&importLoaders=2', 'postcss', 'sass?indentedSyntax']),
    scss: generateLoaders(['css?minimize=true&importLoaders=2', 'postcss', 'sass']),
    stylus: generateLoaders(['css?minimize=true&importLoaders=2', 'postcss', 'stylus']),
    styl: generateLoaders(['css?minimize=true&importLoaders=2', 'postcss', 'stylus'])
  };
};

// 生成样式的rules
exports.styleLoaders = function (options) {
  var output = [];
  var loaders = exports.cssLoaders(options);
  for (var extension in loaders) {
    var loader = loaders[extension];
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    });
  }
  return output;
};

function getAllParams (str) {
  var reg = /(\w+)=(\w+)/ig,
      params = {};
  str.replace(reg, function (whole, key, value) {
    params[key] = value;
  });
  return params;
}

