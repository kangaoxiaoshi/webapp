var config = {
  // 项目根路径
  baseUrl: 'webapp',
  assetRoot: '/webapp/asset/src/',
  gateway: 'http://120.24.1.97/shibufangcao/',
  routesList: [
    'index',
    'teacher/index',
    'teacher/indexgreen',
    'teacher/detail',
    'teacher/detailgreen'
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
    'teacherIndexGreenHtml': 'template/teacher/indexgreen.html',
    'teacherDetailHtml': 'template/teacher/detail.html',
    'teacherDetailGreenHtml': 'template/teacher/detailgreen.html',
    'teachermoreHtml': 'template/teacher/mteacher.html'
  }
};

