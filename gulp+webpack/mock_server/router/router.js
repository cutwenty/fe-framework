const fs = require('fs');
const url = require('url');
const path = require('path');
const mime = require('./mime.js');

module.exports = function(req, res, next) {
  let urlObj = url.parse(req.url,true);
  let pathNames = urlObj.pathname.split('/');
  let fileName;
  if (pathNames[1] === 'lib' || pathNames[1] === 'image') {
    fileName = `../${pathNames[1]}/` + pathNames[2];
    getFile(fileName, res, next);
  } else {
    next();
  }
  return;
};

function getFile(dataFile, res, next) {
  dataFile = path.resolve(__dirname, dataFile);
  res.setHeader('Content-Type',mime.getMime(dataFile));
  fs.readFile(dataFile, function (err, data) {
    if (err) {
      throw err;
    }
    res.end(data);
    next();
  });
}
