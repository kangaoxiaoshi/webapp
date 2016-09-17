define([
  'abstract',
  'text!UIHintHtml'
], function(
  UIAbstract,
  template
) {
  var Hint = UIAbstract.extend({
    options: {
      msg: '',
      timeout: 3000
    },
    attributes: {
      class: 'pub-modal--hint'
    },
    _create: function() {
      this.on('onShow', function() {
        if (this.timer) {
          clearTimeout(this.timer);
        }
        var self = this;

        this.timer = setTimeout(function() {
          self.hide();
        }, this.options.timeout);
      });
    },
    _setOptions: function(options) {
      // 每次都重置参数
      this.options = $.extend(true, {}, this.constructor.prototype.options, options);
      var html = this.template(template, this.options);
      this.$el.html(html);
    }
  });

  return Hint;
});