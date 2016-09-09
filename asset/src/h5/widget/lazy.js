define([
  'backbone',
  'util'
  ], function (
    Backbone,
    util
  ) {
  var lazy = {
    start: function () {
      new Rotuter();
     // Start Backbone app
      Backbone.history.start({
        // 设置根路径
        root: config.baseUrl,
        // 启用pushState
        pushState: true
      });
    },
  };
  //路由
  var Rotuter = Backbone.Router.extend({
    initialize: function () {
      this.firstLoad = true;
      this.main = $('#main');
      this.throttle = _.throttle(this.routerAction, 401); 
      this.route('*path', 'throttle');
    },
    routerAction: function () {
      
      var self = this, query = void 0, 
          ctrl =void 0,
          fragment = Backbone.history.fragment,
          queryIndex = fragment.indexOf('?');

      if (queryIndex === -1) {
        ctrl = fragment;
      } else {
        ctrl = fragment.slice(0, queryIndex);
        query = fragment.slice(queryIndex + 1);
      }

      if (!ctrl) {
        ctrl = "index";
      }

      var ctrSrc = 'controller/' + ctrl;
      query = util.getQuery(query);
      require([ctrSrc], function(View) {
        self.loadCtrl(View, ctrl, query)
      });
    },
    loadCtrl: function(View, ctrl, query) {
      if (!this.firstLoad) {
        app.prevView = app.currentPage;
      }
     
      var view = new View({
        query: query,
        ctrlName: ctrl
      });
      app.currentPage = view;
      //这里处理你的逻辑，比如 动画什么的
      debugger;
      this.main.append(view.el);
    }
    
  });

  return lazy;
})