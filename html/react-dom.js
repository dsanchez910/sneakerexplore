(function(f) {
  
  if (typeof exports === "object" && typeof module !== "undefined") {
    module.exports = f(require('react'));

  
  } else if (typeof define === "function" && define.amd) {
    define(['react'], f);

 
  } else {
    var g;
    if (typeof window !== "undefined") {
      g = window;
    } else if (typeof global !== "undefined") {
      g = global;
    } else if (typeof self !== "undefined") {
      g = self;
    } else {
    
      g = this;
    }
    g.ReactDOM = f(g.React);
  }

})(function(React) {
  return React.__SECRET_DOM_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
});
