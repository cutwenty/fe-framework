module.exports = {
  app: 'vancl',
  // 前端地址
  host: 'www.hxhgta.com',
  port: 80,
  homeDir: './',
  distDir: './dist',
  routers: [],
  // watchxxx，监视文件变动，xxx用来输出的文件
  entries: {
    watchTpl: './src/template/*.html',
    html: './src/*.html',
    // gulp监视和任务处理的是不同的文件路径
    // 监视的范围大，但是只输出几个文件
    watchJs: './src/js/**/*',
    js: './src/js/*.js',
    watchCss: './src/css/page/**/*',
    css: './src/css/page/*.scss',
    font: './src/font/*'
  },
  output: {
    html: './dist',
    js: './dist/js',
    css: './dist/css',
    font: './dist/font'
  },
  rev: {
    manifest: './rev/**/*.json',
    js: './rev/js',
    css: './rev/css',
    replaceDir: {
      'css': 'css',
      'js': 'js'
    }
  }
};
