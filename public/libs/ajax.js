;
(function (root, factory) {
  'use strict';
  /* istanbul ignore next */
  if (typeof define === 'function' && define.amd) {
    define('Ajax', factory);
  }
  else if (typeof exports === 'object') {
    exports = module.exports = factory();
  }
  else {
    root.Ajax = factory();
  }
})(this, function () {
  'use strict';
  var $private = {};

  var createMethods = function createMethods() {
    return {
      then: function () {
      },
      done: function () {
      },
      error: function () {
      },
      always: function () {
      }
    }
  }
  $private.XHRConnection = function XHRConnection(type, url, data) {
    var methods = createMethods();

    var xhr = new XMLHttpRequest();
    //var contentType = 'application/x-www-form-urlencoded';

    xhr.open(type, url || '', true);
    //xhr.setRequestHeader('Content-Type', contentType);
    xhr.addEventListener('readystatechange', $private.ready(methods), false);
    xhr.send($private.objectToQueryString(data));

    return $private.promises(methods);
  };
  $private.ready = function ready(methods) {

    return function () {
      var xhr = this;
      var DONE = 4;
      if (xhr.readyState === DONE) {
        methods.always
          .apply(methods, $private.parseResponse(xhr));
        if (xhr.status >= 200 && xhr.status < 300) {
          methods.done.apply(methods, $private.parseResponse(xhr));
          methods.then.apply(methods, $private.parseResponse(xhr));
        }
        methods.error.apply(methods, $private.parseResponse(xhr));
      }
    }
  };
  $private.parseResponse = function parseResponse(xhr) {
    var result;
    try {
      result = JSON.parse(xhr.responseText);
    }
    catch (e) {
      result = xhr.responseText;
    }
    return [result, xhr];
  };

  $private.promises = function promises(methods) {
    var allPromises = {};
    Object.keys(methods).forEach(function (promise) {
      allPromises[promise] = function (callback) {
        return methods[promise] = callback
      }
    }, this);
    return allPromises;
  };

  $private.objectToQueryString = function objectToQueryString(data) {
    console.log(data,typeof data,data instanceof FormData);
    return $private.isObject(data) && (data instanceof FormData) ?
      $private.getQueryString(data)
      : data;
  };

  $private.getQueryString = function getQueryString(object) {
    return Object.keys(object).map(function (item) {
      return encodeURIComponent(item)
        + '=' + encodeURIComponent(object[item]);
    }).join('&');
  };

  $private.isObject = function isObject(data) {
    return '[object Object]' === Object.prototype.toString.call(data);
  };


  function Ajax(url) {
    var $public = {};

    $public.get = function get(data) {
      return $private.XHRConnection('GET', url, data);
    };

    $public.post = function post(data) {
      return $private.XHRConnection('POST', url, data);
    };

    $public.put = function put(data) {
      return $private.XHRConnection('PUT', url, data);
    };

    $public.delete = function del(data) {
      return $private.XHRConnection('DELETE', url, data);
    };

    return $public;
  }

  return Ajax;
});
