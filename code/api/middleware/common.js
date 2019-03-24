'use strict';

const bodyParser = require('body-parser');

exports.handleBodyRequestParsing = (router) => {
  router.use(bodyParser.urlencoded({ extended: true }));
  router.use(bodyParser.json());
};

exports.handleRequestLogging = (router) => {
  router.use((req, res, next) => {
    const {
      url,
      body,
      method,
    } = req;
    const {
      statusCode,
    } = res;
    console.info(method, url, body);
    next();
  });
};
