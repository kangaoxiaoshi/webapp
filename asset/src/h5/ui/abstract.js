define(['backbone'], function (BackBone) {

	var Abstract = BackBone.View.extend({

    constructor: function(options) {
      this.options = $.extend(true, {}, this.options, options);
   		
      if (this.options.el) {
        this.el = this.options.el;
        delete this.options.el;
      }

      // 设置事件
      if (this.options.events) {
        _.extend(this.events, this.options.events);
        delete this.options.events;
      }
      //插件自定义执行初始化事件
      this._ensureElement();
      this._create();
      if (this.options.appendElement) {
      	this.$el.appendTo($(this.options.appendElement));
      	this.trigger('onShow');
      }
    },
    options: {},
    events: {},
    option: function (key, value) {
    	if (arguments.length === 0) {
    		return this.options;
    	}
    	var options = {},
          curOptions,
          parts;
      if (_.isString(key)) {
        //处理带层级的key, 如：'foo.bar'
        parts = key.split('.');
        key = parts.shift();
        if (parts.length) {
          curOptions = options[key] = this.options[key] || {};
          for (var i = 0; i < parts.length - 1; i++) {
            //每次都去修改引用
            curOptions[parts[i]] = curOptions[parts[i]] || {};
            curOptions = curOptions[parts[i]];
          }
          key = parts.pop();
          if (_.isUndefined(value)) {
            return curOptions[key];
          }
          curOptions[key] = value;
        } else {
          if (_.isUndefined(value)) {
            return this.options[key];
          }
          options[key] = value;
        }
      } else if (_.isObject(key)) {
        options = key;
      }
    
      this._setOptions(options);
      return this;
    },
    show: function () {
    	this.$el.show();
    	this.trigger('onShow');
    },
    hide: function () {
    	this.$el.hide();
    },
    template: function(template, data) {
      data = data || {};
      if (_.isString(template)) {
        return _.template(template)(data)
      } else {
        return template(data);
      }
    },
    _create: _.noop,
    _setOptions: _.noop
	});

	return Abstract;
});