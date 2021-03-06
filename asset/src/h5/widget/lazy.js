define([
  'backbone',
  'util',
  'hint'
  ], function (
    Backbone,
    util,
    UIhint
  ) {
  var app = {
    start: function () {
      new Rotuter();
     // Start Backbone app
      Backbone.history.start({
        // 设置根路径
        root: config.baseUrl,
        // 启用pushState
        pushState: true
      });
      
      this._hint = new UIhint ({
        appendElement: document.body
      });
      this._hint.hide();

    },
    hint: function (options) {
      if (_.isString(options)) {
        options = {
          msg: options
        };
      }

      this._hint.option(options);
      this._hint.show();
    },
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
      //params.url = "";
      params.url = config.gateway + params.url;
      params.type = params.type || 'POST';
      params.timeout =  params.timeout || 10000;
      params.contentType= "application/x-www-form-urlencoded";  
      params.dataType = "json";
      // params.headers = {
      //   'cookie' : "JSESSIONID=1"
      // };
      //params.crossDomain= true;
      //params.xhrFields = { withCredentials: true};
      return $.ajax(params);
    },
    goBack: function (url, options) {
      options = _.extend({
          trigger: true,
          replace: true,
          cache: true,
          animate: true
      }, options);

      if (!url) {
        history.back();
      } else {
        Backbone.history.navigate(url, options);
      }
    },
    goTo: function(url, options) {
      options = _.extend({
          trigger: true,
          replace: true,
          cache: true,
          animate: true
      }, options);

      
      Backbone.history.navigate(url, options);
      
    }
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
      if (config.routesList.indexOf(ctrl) !== -1) {
        var ctrSrc = 'controller/' + ctrl;
        query = util.getQuery(query);
        require([ctrSrc], function(View) {
          self.loadCtrl(View, ctrl, query)
        });
      } else {
        app.goBack('index');
      }
     
    },
    loadCtrl: function(View, ctrl, query) {
      
      if (!this.firstLoad) {
        app.preView = app.currentPage;
      }
      
      var view = new View({
        query: query,
        ctrlName: ctrl
      });
      app.currentPage = view;
      //这里处理你的逻辑，比如 动画什么的
      
      this.main.append(view.el);
      app.loadPage(view);
      if (app.preView) {
        
        //之前页面删除
        app.preView._pageRemove();
      }
      this.firstLoad = false;
    },
    
  });

  return app;
})