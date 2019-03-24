'use strict';

const express = require('express');
const http = require('http');

// 1. Create main express intance
const router = express();

// 2. Require utility function for adding middleware
const { applyMiddleware } = require('./utils');

// 3a. Require general middleware
const middleWare = require('./middleware');
// 3b. Require error handling middleware
const errorHandlers = require('./middleware/errorHandlers');

// 4. Require routes
const { router: portfolioRoutes } = require('./routes/portfolios/portfolioRoutes');
const { router: stockRoutes } = require('./routes/stocks/stockRoutes');

// 5. Require conatants
const { PORT } = require('./utils/constants');

// 6. Apply general middleware
applyMiddleware(middleWare, router);

// 7. Utilise routes
router.use('/api/portfolios', portfolioRoutes);
router.use('/api/stocks', stockRoutes);

// 8. Apply error handling middleware (meaningfully last)
applyMiddleware(errorHandlers, router);

// 9. Create a server from express instance
const server = http.createServer(router);

// 10. Start server
server.listen(PORT, async () => {
  try {
    await require('./seed').seed();
    console.log(`Server is running on PORT:${PORT}`);
    if (process.send) {
      // NOTE: process is being run by pm2
      process.send('ready');
    }
  } catch (e) {
    throw e;
  }
});
