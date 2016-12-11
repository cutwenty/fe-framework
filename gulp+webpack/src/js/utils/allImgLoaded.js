(function (window, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? module.exports = factory()
    : typeof define === 'function' && define.amd
      ? define(factory)
      : (window.allImgLoaded = factory());
})(window, function () {

  function allImgLoaded (el, cb) {
    isString(el) && (el = document.querySelector(el));
    var imgs = el.getElementsByTagName('img');
    var toLoad = imgs.length;
    for(var i = 0; i < imgs.length; i++) {
      imgs[i].addEventListener('load', function () {
        toLoad--;
        if (toLoad === 0) {
          cb();
        }
      });
    }
  }

  function isString (obj) {
    return Object.prototype.toString.call(obj) === '[object String]';
  }

  return allImgLoaded;
});
