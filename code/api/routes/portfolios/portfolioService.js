'use strict';

const PortfolioModel = require('./portfolioModel');

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

exports.addPortfolioStock = async ({ portfolioId, stockData }) => {
  const portfolio = await PortfolioModel.findById(portfolioId);
  await portfolio.addStock();
}
