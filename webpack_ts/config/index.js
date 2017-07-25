
// 配置文件出口
var path = require('path');
var prodEnv = require('./prod.env');
var devEnv = require('./dev.env');

module.exports = {
  build: {
    env: prodEnv,
    // 生成index.html的位置
    index: path.resolve(__dirname, '../dist/index.html'),
    // 生成静态文件的文件根路径
    assetsRoot: path.resolve(__dirname, '../dist'),
    // 静态文件生成的子路径
    // 此时文件会在assetsRoot+assetsSubDirectory下生成
    // 不能是绝对路径，不能 / 开头
    assetsSubDirectory: '',
    // index.html内插入的script、link标签的静态文件url的公共路径
    // assetsPublicPath+assetsSubDirectory+具体生成路径
    // js、css的具体生成路径在build的相关文件里
    assetsPublicPath: '/',
    // 是否生成sourcemap
    productionSourceMap: false,
    // 是否压缩，要有compression-webpack-plugin
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    // 要gzip压缩的文件后缀
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: devEnv,
    port: 8000,
    // assetsPublicPath+assetsSubDirectory的路径，用来访问静态文件
    // 会被转到根目录的 static 文件夹内
    // 实际开发模式中，js、css都在内存中，访问的都是static内的文件
    // 不能是绝对路径，不能 / 开头
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false,
    // 代理设置，在开发中很有用，基本配置模板如下
    proxyTable: {
      // '/h5/**': {
      //     target: 'http://sit.zwgt.com',
      //     changeOrigin: true,
      //     pathRewrite: {
      //         '^/h5/': '/h5/'
      //     }
      // }
    },
  }
};
