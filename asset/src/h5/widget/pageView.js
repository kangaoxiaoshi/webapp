define([
    'backbone',
    'util'
  ], function (Backbone, util) {
    var PageView = Backbone.View.extend({
      options: {        
        rememberQuery: false,      
      },
      tagName: 'article',  
      attributes:{
        class:'page'
      },
      initialize: function (template, data) {
        
        this.onCreate();
      },
      // setElement: function(element) {
      //   this._setElement(element);
      //   return this;
      // },
      onCreate: _.noop,
      //模板操作
      template: function (template, data) {
        if (util.type(data) === "String") {
          data = JSON.parse(data);
        }

        return _.template(template)(data);
      },

      _pageRemove: function () {
        this.undelegateEvents();
        this.remove();
      }
    });
    return PageView;
  })