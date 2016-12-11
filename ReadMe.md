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