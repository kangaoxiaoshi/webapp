define(function () {
  var util = {
    type: function (obj) {
      return Object.prototype.toString.call(obj).match(/^\[object\s+([^\]]+)]$/)[1];
    },
    isArray: function (obj) {
      return this.type(obj) === 'Array';
    }  
  };

  return util;
})
