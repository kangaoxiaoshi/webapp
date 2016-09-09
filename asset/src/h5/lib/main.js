require.config({
  baseUrl: '/imgUpload/asset/src/',
  shim: {
    // 新版本支持amd加载
    zepto: {
      exports: '$'
    },
    backbone: {
      deps: ['underscore', 'zepto']      
    }
  },
  paths: {
    'zepto': 'h5/lib/zepto',
    'ImageUpload': 'h5/widget/imgUpload',
    'text': 'h5/lib/text',
    'underscore': 'h5/lib/underscore',
    'util': 'h5/widget/util'
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


