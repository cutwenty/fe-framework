require('shelljs/global');

const config = require('./config');

const gulp = require('gulp');
// const notify = require('gulp-notify');

// 打开devserver
const webserver = require('gulp-webserver');

// scss编译
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

// js版本控制
const rev = require('gulp-rev');
const revCollector = require('gulp-rev-collector');
const minifyHTML = require('gulp-minify-html');

// js 编译
const webpack = require('gulp-webpack');
const named = require('vinyl-named');
const uglify = require('gulp-uglify');

gulp.task('copy_html', function () {
  gulp.src(config.entries.html)
    .pipe(gulp.dest(config.output.html));
    // .pipe(notify({message: 'html移动完成'}));
});

gulp.task('copy_font', function () {
  gulp.src(config.entries.font)
    .pipe(gulp.dest(config.output.font));
    // .pipe(notify({message: 'font移动完成'}));
});

// router 用来路由lib文件、image文件
// apiRouter用来路由ajax
const router = require('./mock_server/router/router.js');
const apiRouter = require('./mock_server/router/apiRouter.js');
// 配置cros
const allowCross = require('./config/allowCrossDomain.js');
// 用来解决手机调试，使用路由时产生的问题
const reqUrl = require('./mock_server/router/reqUrl.js');

gulp.task('webserver', function() {
  gulp.src(config.distDir)
    .pipe(webserver({
      host: '0.0.0.0',
      port: config.port,
      directoryListing: {
        enable: true,
        path: config.distDir,
        open: true
      },
      proxies: [{source: '/'+config.app, target: 'http://'+config.host}],
      livereload:true,
      // 代理
      // {source: '/abc', target: 'http://localhost:8080/abc', options: {headers: {'ABC_HEADER': 'abc'}}}
      // proxies: [],
      //mock 数据
      middleware:[reqUrl, allowCross, router, apiRouter]
    }));
});

gulp.task('scss', function() {
  rm('-rf', './dist/css/*.css');
  gulp.src(config.entries.css)
    .pipe(autoprefixer({
      browsers:['>5%'],
      cascade: true,
      remove:true
    }))
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rev())
    .pipe(gulp.dest(config.output.css))
    .pipe(rev.manifest())
    .pipe(gulp.dest(config.rev.css));
    // .pipe(notify({message: 'scss编译完成'}));
});

gulp.task('rev', function () {
  gulp.src([config.rev.manifest, config.entries.html])
    .pipe(revCollector({
      replaceReved: false,
      dirReplacements: config.rev.replaceDir
    }))
    .pipe(minifyHTML({
      empty:true,
      spare:true
    }))
    .pipe(gulp.dest(config.distDir));
});

gulp.task('js', function() {
  rm('-rf', './dist/js/*.js');
  gulp.src(config.entries.js)
    .pipe(named())
    .pipe(webpack({
      output: {
        filename: '[name].js'
      },
      devtool: "source-map",
      module: {
        preLoaders: [
          {
            test: /\.js?$/,
            loader: 'eslint',
            exclude: /node_modules/
          }
        ],
        loaders: [
          {
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/
          },
          {
            test: /\.json$/,
            loader: 'json'
          },
          {
            test: /\.html$/,
            loader: 'raw'
          }
        ]
      },
      eslint: {
        formatter: require('eslint-friendly-formatter')
      }
    }))
    .pipe(uglify().on('error', function(err) {
      console.log('\x07', err.lineNumber, err.message);
      return this.end();
    }))
    .pipe(rev())
    .pipe(gulp.dest(config.output.js))
    .pipe(rev.manifest())
    .pipe(gulp.dest(config.rev.js));
    // .pipe(notify({message: 'js编译完成'}));
});

gulp.task('watch',function () {
  gulp.watch([config.rev.manifest, config.entries.html], ['rev']);
  gulp.watch(config.entries.html, ['copy_html']);
  gulp.watch([config.entries.watchCss, config.entries.watchTpl], ['scss']);
  gulp.watch([config.entries.watchJs, config.entries.watchTpl], ['js']);
});

gulp.task('build', ['copy_html', 'copy_font', 'scss', 'js', 'rev'], function () {
  console.log('build完成;');
});

gulp.task('default', ['watch', 'webserver'], function () {
  console.log('gulp启动完成;');
});
