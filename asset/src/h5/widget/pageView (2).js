/**
 * 页面基类
 * @class 
 * @name PageView
 */
define([
  'backbone',
  'prefix',
  'UIHeader',
  'ubt'
], function(
  Backbone,
  prefix,
  UIHeader,
  ubt
) {
  var delegateEventSplitter = /^(\S+)\s*(.*)$/;
  /**
     * 页面根元素,jQuery对象
     * @name PageView.prototype.$el
     */

    /**
     * 页面根元素，原生dom对象
     * @name PageView.prototype.el
     */

     /**
     * 监听事件
     * @function
     * @name PageView.prototype.on
     * @see http://backbonejs.org/#Events
     */

     /**
     * 取消事件
     * @function
     * @name PageView.prototype.off
     * @see http://backbonejs.org/#Events
     */


     /**
     * 只监听一次事件
     * @function
     * @name PageView.prototype.once
     * @see http://backbonejs.org/#Events
     */

     /**
     * 触发事件
     * @function
     * @name PageView.prototype.trigger
     * @see http://backbonejs.org/#Events
     */

      /**
     * 页面的查询参数
     * @object
     * @name PageView.prototype.query
     * @example
     * // 比如一个页面的url为  webapp/order/index?status=2&id=1
     * this.query => { status: 2, id: 1 }
     */

       /**
     * 页面的控制器名字，其实就是路由名字
     * @object
     * @name PageView.prototype.ctrlName
     * @example
     * // 比如一个页面的url为  webapp/order/index?status=2&id=1
     * this.ctrlName => 'order/index'
     */

  // 页面基类view
  var PageView = Backbone.View.extend(/** @lends PageView.prototype */{
    /**
     * 页面配置参数
     * @type {object}
     * @example
     // 页面的id用于ubt统计查询使用, 字符串，前两位表示模块
     pageId: '10000'
     
     // 回退是否使用缓存，默认为true
     goBackWithCache: true
     
     // 判断一个页面是否需要重定向，跳转到其他页面，如果有返回值，则跳到该页面
     // isLogin 是否登录
     // query 页面查询参数
     redirectCtrl: function(isLogin, query) {
    
     }
     */
    options: {
      // 跳转页面的时候记住查询参数
      rememberQuery: false,
      // 页面缓存
      cache: false,
      // ajax异常的时候，是否触发onShow回调
      ajaxErrorShow: false
    },
    setElement: function(element) {
      this._setElement(element);
      return this;
    },
    // 重写代理事件
    delegateEvents: function() {
      this.undelegateEvents();

    /**
     * 触发事件  
     * ``规范``: 回调函数的名字都以``Action``结尾， 事件的类名都以``js-``开头
     * @object
     * @name PageView.prototype.events
     * @example
     events: {
        'click .js-add': 'addAction',
        'click .js-remove': function() {
  
        },
        'click .js-oil': 'oilAction'
     },
     oilAction: function(e) {
       var clickTarget = $(e.target);
       var isConent = clickTarget.closest('.small');
        
       // 点击小区域
       if (isConent.length) {
  
       } else {
       // 其他区域
       }
     }
     */

      var events = this.events;
      var self = this;

      var listener = function(callback, e) {
        var target = $(e.currentTarget);
        var name = target.attr('lcb-name');
        var custom = target.attr('lcb-ubt');


        if (custom) {
          custom = JSON.parse(custom);
          custom.en = name;
        //  custom.e = 2;
          name = custom;
        }

        // btn按钮ajax控制
        if (target[0].hasAttribute('data-ajax')) {
          if (!target.attr('lcb-stop')) {
            app.ajax.target = target;
            callback.call(this, e);
            self.ubtClickSend(name);
          }
        } else {
          callback.call(this, e);
          self.ubtClickSend(name);
        }
      }

      // 事件分类处理
      for (var key in events) {
        var match = key.match(delegateEventSplitter);
        var type = match[1];
        var method = events[key];

        if (!_.isFunction(method)) method = this[events[key]];

        this.delegate(match[1], match[2], _.bind(listener, this, method));
      }
    },
    /**
    * ubt点击统计,一般情况下不需要自己调用，只需要在页面里的html元素里面，定义lcb-name属性
    * @param {string} name 点击元素的名字
    * @example
    * // 主动调用
    * this.ubtClickSend('cityChange');
    * 
    * // html元素自动监控
    * &lt;div lcb-name="city"&gt;统计城市切换&lt;/div&gt;
    * // 如果元素是列表一类的元素，使用 , 分层次统计
    * &lt;div lcb-name="book,293,4"&gt;预定&lt;/div&gt;
    */
    ubtClickSend: function(name) {
      var id = this.options.pageId;
      if (name) {
        if (_.isString(name)) {
           ubt.clickSend(name, id);
         } else {
          if (!name.e) {
            name.e = 2;
          }
           ubt.send(name, id);
         }
      }
    },
    /**
     * 页面根元素标签，一般不需要自定义
     */
    tagName: 'article',
    /**
     * 页面根元素属性, 一般不需要自定义属性，如果需要的话，可以重写该属性，但必须保留``page``类
     * @example
     attributes: { class: 'page user-page' }
     // 重写一个页面的样式的,不能给 page-content类 写内敛样式
     attributes: { 
       class: 'page',
       style: 'background:#fff'
     }
     */
    attributes:{
      class:'page'
    },
    /**
     * 一个页面头部的组件，头部组件是单例的，所有页面共享一个头部
     * api参考 {@link UIHeader#options}
     * @example
     * this.header.option({
     *   center: {
     *     text: '乐车邦'
     *   }
     * });
     *
     * this.header.option({
     *   left: {
     *     // 返回左边的文字
     *     appendText: ''
     *   },
     *   right: [{
     *     text: '',
     *     callback: function() {}
     *   }]
     * })
     * 
     *  // 设置单个参数
     * this.header.option('center.text', 'newTitle'); 
     */
    header: new UIHeader({
      el: document.querySelector('header')
    }),
    /**
     * view对象创建的回调
     * @type {function}
     */
    onCreate: _.noop,
    /**
     * view对象显示出来的回调
     * @type {function}
     */
    onShow: _.noop,
    // 销毁回调
    //onRemove: _.noop,
   /**
     * 模板渲染
     * @param {string} template 模板
     * @param {object} data 数据
     * @example
     * var html = this.template('&lt;h2&gt;<%= title%>&lt;/h2&gt;', {
     *   title: 'test'
     * });
     */
    template: function(template, data) {
      return app.template.call(this, template, data);
    },
    initialize: function() {
      this._ajax = {
        // setInterval
        setInterval: [],
        setTimeout: [],
        query: JSON.stringify(this.query)
      };


      // 头部设置
      prefix.events(this.el, 'AnimationEnd', _.bind(this._animationEnd, this));

      
      app.currentPage = this;
      this.onCreate();
    },
    remove: function() {
      this.$el.css('display', 'none');
      this.$el.remove();
      var styleDom = this._style;
      // 删除样式style
      if (styleDom) {
        styleDom.parentNode.removeChild(styleDom);
      }
      this.stopListening();
      if (this.onRemove) {
        this.onRemove();
      }
    },
    /**
     * 监听页面内容区域滚动, 实现滚动加载和图片延迟加载需要
     * @example
     this.addOnScroll();
     */
    addOnScroll: function() {
      var self = this;
      var pageContent = this.$('.page-content');
      var contentInner = this.$('.page-content-inner');
      var fn = _.throttle(function() {
        /**
         * 页面滚动事件
         * @name PageView#scroll
         * @event
         */
        self.trigger('scroll');
        // 加载更多内容

        // 页面是否滚动到底部
        if (contentInner.length) {
          var height = contentInner.height();
          var top = pageContent.scrollTop() + document.documentElement.clientHeight + 80;

          console.info('height:' + height + ',top:' + top);

          if (top > height) {
        /**
         * 页面滚动到底部了
         * @name PageView#bottom
         * @event
         */
            self.trigger('bottom');
          }
        }
      }, 200);

      this.off('scroll bottom');

      pageContent.off('scroll').on('scroll', fn);
    },
    _cssInsert: function() {
      var pageCss = this.options.pageCss;

      // 插入样式
      if (pageCss) {
        this._style = document.createElement('style');
        this._style.innerHTML = pageCss;
        $('head').append(this._style);
      }
    },
    _pageRemove: function(anmiate, left) {
      this._clearInterval();
      // 取消事件
      this.undelegateEvents();

      this.trigger('remove');

      if (this._ajax.req && this.options.cache) {
        var pc = this.$('.page-content');

        if (pc.length) {
          this._ajax.scrollTop = pc[0].scrollTop;
        }

        app._.pushPageView(this);
      }

      if (anmiate) {
        var cls = left ? 'page-from-center-to-left' : 'page-from-center-to-right';
        this.$el.addClass(cls);
      } else {
        this.remove();
      }
    },
    _pageShow: function(animte, isNew) {
      if (animte) {
        this.$el.addClass(isNew ? 'page-from-right-to-center' : 'page-from-left-to-center');
      } else {
        this.delegateEvents();
      }
    },
    _animationEnd: function(e) {
      var name = e.animationName;

      if (name === 'pageFromCenterToRight' || name === 'pageFromCenterToLeft') {
        this.remove();
      } else if (name === 'pageFromRightToCenter' || name === 'pageFromLeftToCenter') {
        this.$el.removeClass('page-from-left-to-center page-from-right-to-center');
        this.delegateEvents();
      }
    },
    _cacheShow: function(root) {
      console.info('当前页面是缓存页面');
      this._cssInsert();
      app.currentPage = this;

      this.$el.show().removeClass('page-from-center-to-left page-from-center-to-right');
      var self = this;
      var viewSetInterval = this._ajax.setInterval;
      var viewSetTimeout = this._ajax.setTimeout;

      this._ajax.setInterval = [];
      this._ajax.setTimeout = [];

      root.append(this.el);

      var pc = this.$('.page-content');

      if (pc.length) {
        // 滚动指定位置
        pc[0].scrollTop = this._ajax.scrollTop;
      }

      // 恢复setInterval
      _.each(viewSetInterval, function(item) {
        self.setInterval(item.fn, item.time);
      });

      // 恢复setTimeout
      _.each(viewSetTimeout, function(item) {
        if (item.time > 0) {
          self.setTimeout(item.fn, item.time);
        }
      });
    },
    /**
     * 当前view对象，重新渲染
     * @param {object} [query] 页面查询参数
     * @example
     * this.reload({ id: 3 });
     */
    reload: function(query) {
      app.showLoading(300);
      // 清除setInterval
      this._clearInterval();

      for (var i in query) {
        var item = query[i];

        if (_.isNull(item) || _.isUndefined(item)) {
          delete this.query[i];
        } else {
          this.query[i] = item; 
        }
      }

      app.reload(this, this.ajax ? this.ajax() : '');
      app._.replace(this);
    },
    _clearInterval: function() {
      // 清除setInterval定时器
      _.each(this._ajax.setInterval, function(item) {
        clearInterval(item.timer);
      });

      _.each(this._ajax.setTimeout, function(item) {

        item.time = item.time + item.saveTime - _.now();

        clearTimeout(item.timer);
      });
    },
    /**
     * 延迟函数，页面销毁自动清理  
     * ``注意``: 不能直接使用全局的setTimeout
     * @param {function} fn 函数
     * @param {int} time 时间
     * @return {int} 计时器id
     * @example
     this.setTimeout(function() {
       // this指向当前的pageView
       console.log(this);
     }, 3000);
     */
    setTimeout: function(fn, time) {
      var timer = setTimeout(_.bind(fn, this), time);

      this._ajax.setTimeout.push({
        timer: timer,
        fn: fn,
        time: time,
        saveTime: _.now()
      });

      return timer;
    },
    /**
     * 循环函数，页面销毁自动清理  
     * ``注意``: 不能直接使用全局的setInterval
     * @param {function} fn 函数
     * @param {int} time 时间
     * @return {int} 计时器id
     * @example
     this.setInterval(function() {
       // this指向当前的pageView
       console.log(this);
     }, 3000);
     */
    setInterval: function(fn, time) {
      var timer = setInterval(_.bind(fn, this), time);
      var set = this._ajax.setInterval;
      var index = set.length + 1;

      set.push({
        timer: timer,
        fn: fn,
        time: time,
        index: index
      });

      return index;
    },
    clearInterval: function(index) {
      var pos = _.findIndex(this._ajax.setInterval, function(item) {
        return item.index === index;
      });

      if (pos !== -1) {
        var item = this._ajax.setInterval.splice(pos, 1)[0];
        clearInterval(item.timer);       
      } else {
        console.info('清除定时器出错');
      }
    }
  });

  return PageView;
});