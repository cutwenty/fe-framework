const url = require('url');

module.exports = function(req, res, next) {
  if (req.url.match(/\/http(s?):\/\//)) {
    req.url = req.url.slice(1);
  }
  next();
};
