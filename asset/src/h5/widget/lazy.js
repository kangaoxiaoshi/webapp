define([
  'backbone',
  'util'
  ], function (
    Backbone,
    util
  ) {
  var lazy = {
    start: function () {

    },
  };
  //路由
  var Rotuter = Backbone.Router.extend({
    initialize: function () {
      this.firstLoad = true;
      this.main = $('#main');
      var startFun = _.throttle(this.routerAction, 400); 
      this.route('*path', 'startFun');
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

      var ctrSrc = 'controller/' + ctrl;
      query = util.getQuery(query);
      require([ctrlSrc], function(View) {
        self.loadCtrl(View, ctrl, query)
      });
    },
    loadCtrl: function(View, ctrl, query) {
      //这里处理你的逻辑，比如 动画什么的
      this.main.append(View.el);
    }
    
  });

  return lazy;
})