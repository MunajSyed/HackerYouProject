'use strict';

exports.seed = async () => {
  const StockModel = require('./routes/stocks/stockModel');
  const PortfolioModel = require('./routes/portfolios/portfolioModel');
  // INFO: call private seed functions
  await StockModel._seed();
  await PortfolioModel._seed();

  // INFO: fetch all seeded stocks
  const stocks = await StockModel.find();
  // INFO: fetch all seeded portfolios
  const portfolios = await PortfolioModel.find();

  // INFO: add each stock to the _first_ portfolio
  stocks.forEach((stock) => {
    portfolios[0].addStock(stock);
  });
};
