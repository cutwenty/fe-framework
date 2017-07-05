// 浏览器订阅webpack的事件
// 检测到事件发生，就刷新页面
require('eventsource-polyfill');
var hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true');

hotClient.subscribe(function (event) {
  if (event.action === 'reload') {
    window.location.reload();
  }
});
