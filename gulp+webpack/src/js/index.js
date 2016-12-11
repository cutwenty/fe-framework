import template from './views/indexView.js';
import { render } from './utils';



new Promise((resolve, reject) => {
  $.ajax({
    url: '',
    success (data, status, xhr) {
      resolve(data);
    },
    error (xhr, errType, err) {
      reject(err);
    }
  });
})
.then(
  (data) => {
    return resolveData(data);
  },
  (err) => {
    console.log(err);
  }
)
.then(
  (data) => {
    renderHTML(data);
  }
);

function resolveData (data) {
  return data;
}

function renderHTML (data) {
  render($('#app'), template(data));
  init();
}

function init () {

}
