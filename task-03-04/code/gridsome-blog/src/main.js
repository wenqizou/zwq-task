// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
const copy = (message) => {
  let doc = document.createElement('input');
  doc.value = message;
  document.body.appendChild(doc);
  doc.select();
  let status;
  try {
    status = document.execCommand('copy');
  } catch (e) {}
  document.body.removeChild(doc);
  return status;
};
export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.use(ElementUI);
  Vue.component('Layout', DefaultLayout);
  Vue.filter('dateFilter', function (value, format = 'yyyy-MM-dd hh:mm:ss') {
    let date = new Date(value);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let min = date.getMinutes();
    let seconds = date.getSeconds();
    let monthS = month < 10 ? '0' + month : month + '';
    let dayS = day < 10 ? '0' + day : day + '';
    let hourS = hour < 10 ? '0' + hour : hour + '';
    let minS = min < 10 ? '0' + min : min + '';
    let secondsS = seconds < 10 ? '0' + seconds : seconds + '';
    const desc = format
      .replace('yyyy', year)
      .replace('MM', monthS)
      .replace('dd', dayS)
      .replace('hh', hourS)
      .replace('mm', minS)
      .replace('ss', secondsS);
    return desc;
  });
  Vue.prototype.$share = function (message) {
    if (!message) {
      message = window.location;
    } else {
      let arr = (window.location + '').split('#');
      message = arr[0] + '#' + message;
    }
    if (copy(message)) {
      Vue.prototype.$confirm('链接已复制,去分享给好友吧!!', '分享', {
        showCancelButton: false,
        showClose: false,
        type: 'success',
      });
    } else {
      Vue.prototype.$confirm('链接复制失败,可能因为浏览器不兼容', '分享', {
        showCancelButton: false,
        showClose: false,
        type: 'warning',
      });
    }
  };
}
