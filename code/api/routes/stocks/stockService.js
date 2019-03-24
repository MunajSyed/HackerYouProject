'use strict';

const StockModel = require('./stockModel');
const PortfolioModel = require('../portfolios/portfolioModel');

exports.listStocks = async () => await StockModel.find();

exports.createStock = async (stockData) => {
};
