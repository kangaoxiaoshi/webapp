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
      
      this.main.append(view.el);
      app.loadPage(view);
      this.firstLoad = false;
    },
    
  });

  var app = {
    loadPage: function (view) {
     
      var ajaxs = view.ajax ? view.ajax() : null;
      if (_.isArray(ajaxs)) {
        var count = 0,
          result = [];
        _.each(ajaxs, function(item, index) {
          item.success = function(data) {
            result[index] = data;
            if (++count >= ajaxs.length) {
              view.onShow.apply(view, result);
            }
          };
          app.ajax(item);
        })
      } else if (ajaxs) {
        ajaxs.success = function (data, status, xhr) {
          view.onShow.apply(view, result);
        }
        app.ajax(ajaxs);
      }
    },
    ajax: function (params) {
      if (!params.data) {
        params.data = {};
      }
      params.url = config.gateway + params.url;
      params.type = params.type || 'post';
      params.timeout =  params.timeout || 10000;
      params.success = function(data, status, xhr) { 
        if (params.success) {
          params.success(data, status, xhr, options.data);
        }
      },
      params.error = function(xhr, errorType, error) {
        if (params.error) {
          params.error();
        } else {
          app.alert('网络出错，请稍后再试');
        }
      }

      return $.ajax(params);
    }
  }; 

  return lazy;
})