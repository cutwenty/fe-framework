# 前端框架配置集合
这是在前端做项目时手机的一些可以通用的框架的集合。

## gulp + webpack 多页面

[gulp + webpack 多页面框架](https://github.com/cutwenty/fe-framework/tree/master/gulp%2Bwebpack)。

架构目录结构：

	gulp+webpack
	├── config
	├── dist
	├── mock_server
	│   ├── api
	│   ├── image
	│   ├── lib
	│   └── router
	├── rev
	└── src
	    ├── css
	    │   ├── lib
	    │   ├── page
	    │   │   └── common
	    │   └── usage   
	    ├── font
	    ├── js
	    │   ├── utils
	    │   └── views
	    └── template
	    
* config：gulpfile 的配置放在里面。
* dist：项目编译生成的文件，最后部署到云端的内容。
* mock_server：假后端文件夹，api、image、lib，放数据、图片、库文件。router 放路由文件，被 gulpfile 读取使用。
* rev：放版本控制文件。
* src：源文件文件夹，放html 入口文件。scss 文件写在 /src/css/page下；js 文件写在 /src/js 下；template 文件夹放页面的模板文件。

使用 gulp 打开项目

	sudo gulp
	
TODOS：

1. webpack 的 source-map 似乎不起作用

## webpack

webpack 单页面项目结构。根据 webpack 扩充的功能不同，还分为了

1. webpack_base：最基本的 webpack 配置。babel 编译 js，sass、less、postcss 等处理样式文件。

2. webpack_ts：增加 typescript 编译 ts 文件。

基本项目结构：

	.
	├── build
	│   ├── build.js
	│   ├── dev-client.js
	│   ├── dev-server.js
	│   ├── utils.js
	│   ├── webpack.base.conf.js
	│   ├── webpack.dev.conf.js
	│   └── webpack.prod.conf.js
	├── config
	│   ├── dev.env.js
	│   ├── index.js
	│   ├── prod.env.js
	│   └── test.env.js
	├── dist
	├── index.html
	├── package.json
	├── postcss.config.js
	├── src
	└── static
	
1. build，webpack 构建项目的相关文件。build.js 是 build 命令的入口，dev-server.js 是 dev 命令的入口。
2. config，用户配置文件，代理、端口、文件路径等。
3. src，源码文件夹。
4. dist，build 生成文件的文件夹。
5. static，静态文件，图片、lib 等相关内容。build 后会被复制到 dist 下。
6. index.html 项目入口文件。