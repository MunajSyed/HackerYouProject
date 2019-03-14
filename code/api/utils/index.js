'use strict';

exports.applyMiddleware = (middlewareWapper = [], router) => {
  for (const wrapper of middlewareWrapper) {
    wrapper(router);
  }
};
