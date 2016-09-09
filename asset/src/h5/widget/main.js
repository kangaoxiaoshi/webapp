require.config({
  baseUrl: config.assetRoot,
  shim: {
    // 新版本支持amd加载
    zepto: {
      exports: '$'
    },
    backbone: {
      deps: ['underscore', 'zepto']      
    }
  },
  urlArgs: Date.now(),
  paths: {
    'zepto': 'h5/lib/zepto',
    'ImageUpload': 'h5/widget/imgUpload',
    'text': 'h5/lib/text',
    'underscore': 'h5/lib/underscore',
    'util': 'h5/widget/util',
    'lazy': 'h5/widget/lazy',
    'pageView': 'h5/widget/pageView',
    'backbone': 'h5/lib/backbone',
    'text': 'h5/lib/text',
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

require(['lazy'], function (app) {
  window.app = app;
  app.start();
})
