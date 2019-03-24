'use strict';

const StockModel = require('./stockModel');
const PortfolioModel = require('../portfolios/portfolioModel');

exports.listStocks = async () => await StockModel.find();

exports.listStocksByPortfolio = async (portfolioId) => {
  const portfolio = await PortfolioModel.findById(portfolioId);
  return await portfolio.listStocks();
};
