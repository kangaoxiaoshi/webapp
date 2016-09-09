require.config({
  baseUrl: '/imgUpload/asset/src/',
  shim: {
    // 新版本支持amd加载
    zepto: {
      exports: '$'
    }
  },
  paths: {
    'zepto': 'h5/vendor/zepto',
    'ImageUpload': 'h5/lib/imgUpload',
    'imgShow': 'widget/imgShow',
    'imgShowHtml': 'widget/imgShow.html',
    'text': 'h5/vendor/text',
    'underscore': 'h5/vendor/underscore',
    'indexHtml': 'template/index.html',
    'uploadHtml': 'widget/upload.html'
  }
});

function calculate() {
  var html = document.querySelector('body');

  var fontSize, bodyWidth, screenWidth = document.documentElement.clientWidth;

  if (html.getBoundingClientRect) {
    bodyWidth = html.getBoundingClientRect().width;
  } else {
    bodyWidth = screenWidth;
  }

  fontSize = bodyWidth * 100 / 375;

  document.documentElement.style.fontSize = fontSize.toFixed(3) + 'px';
}
var eventName = 'orientationchange' in window ? 'orientationchange' : 'resize';

window.addEventListener(eventName, calculate);
calculate();
//启动
requirejs(['underscore', 'zepto'], function () {
  requirejs(['controller/index']);
});
