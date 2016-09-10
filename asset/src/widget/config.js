var config = {
  // 项目根路径
  baseUrl: 'webapp',
  assetRoot: '/webapp/asset/src/',
  gateway: 'http://120.24.1.97/shibufangcao/',
  routesList: [
    'index',
    'teacher/index',
    'teacher/green'
  ],
  support: {
    storage: true
  },
};

var requirejs = {
  urlArgs: Date.now(),
  //urlArgs: 3,
  paths: {
    'indexHtml': 'template/index.html',
    'teacherIndexHtml': 'template/teacher/index.html',
    'teacherGreenHtml': 'template/teacher/green.html'
  }
};

