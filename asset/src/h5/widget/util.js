define(function () {
  var util = {
    type: function (obj) {
      return Object.prototype.toString.call(obj).match(/^\[object\s+([^\]]+)]$/)[1];
    },
    isArray: function (obj) {
      return this.type(obj) === 'Array';
    } ,
    getQuery: function(query) {
      var ret = {};
      var searchReg = /([^&=?]+)=([^&]+)/g;
      var match, name, value;

      while (match = searchReg.exec(query)) {
        name = match[1];
        value = match[2];
        ret[name] = $.zepto.deserializeValue(decodeURIComponent(value));
      }

      return ret;
    }, 
  };

  return util;
})
