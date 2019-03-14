'use strict';

const express = require('express');
const http = require('http');

const router = express();

const PORT = 8000;

// NOTE: both of these require lines are symantically the same
const { router: userRouter } = require('./routes/users');
// const userRouter = require('./routes/users').router;

const { handleBodyRequestParsing } = require('./middleware/common');
const { handle404Error, handleServerError } = require('./middleware/errors');
const { applyMiddleware } = require('./utils');

applyMiddleware([handleBodyRequestParsing, handle404Error, handleServerError], router);

router.use('/users', userRouter);

const server = http.createServer(router);

server.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
