'use strict';

const PortfolioModel = require('./portfolioModel');
const StockModel = require('../stocks/stockModel');

exports.listPortfolios = async () => await PortfolioModel.find();

exports.createPortfolio = async (portfolioData) => {
  const portfolio = new PortfolioModel(portfolioData);
  try {
    const doc = await portfolio.save();
    return doc;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

exports.listPortfolioStocks = async (portfolioId) => {
  const portfolio = await PortfolioModel.findById(portfolioId);
  const portfolioStocks = await portfolio.listStocks();
  const stockPromises = await portfolioStocks.map(async (membership) => {
    return await StockModel.findById(membership.stockId);
  });

  return {
    portfolio,
    stocks: await Promise.all(stockPromises),
  };
};

exports.addPortfolioStock = async ({ portfolioId, stockData }) => {
  const portfolio = await PortfolioModel.findById(portfolioId);
  await portfolio.addStock();
}
