'use strict';

exports.handle404Error = (router) => {
  router.use((req, res) => {
    throw new Error('Method not found.');
  })
};

exports.handleServerError = (router) => {
  router.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Internal Server Error');
  });
};
