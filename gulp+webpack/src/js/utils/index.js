export function render ($el, html) {
  if($el.get(0).tagName.toLowerCase() === 'body') {
    $el.prepend(html);
  } else {
    $el.html(html);
  }
}

export function async (fn, t = 0, options) {
  setTimeout(() => {
    fn.apply(options.context, options.args);
  }, t);
}
