'use strict';

const StockModel = require('./stockModel');
const PortfolioModel = require('../portfolios/portfolioModel');

exports.listStocks = async () => await StockModel.find();

exports.createStock = async (stockData) => {
  const stock = new StockModel(stockData);
  try {
    const doc = await stock.save();
    return doc;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
