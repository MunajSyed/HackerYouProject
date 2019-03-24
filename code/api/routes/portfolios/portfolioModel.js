'use strict';

const uuid = require('uuid/v4');
const _ = require('lodash');

let _store;

const seedData = [
  { id: 'c1abe814-29cd-4877-8fee-d534157473b2', name: 'High Risk', userId: 'me' },
  { name: 'Low Risk', userId: 'me' },
  { name: 'Medium Risk', userId: 'me' },
];

class Portfolio {
  constructor(data) {
    const { id, name, userId } = data;
    if (!name) {
      throw new Error('missing.property:data.name');
    }
    if (!userId) {
      throw new Error('missing.property:data.userId');
    }

    this.id = id || uuid();
    this.name = name;
    this.userId = userId;
  }

  async save() {
    return _store.save(this);
  }

  async addStock(stock) {
    const portfolioId = this.id;
    const stockId = stock.id;
    const member = new PortfolioStock({ portfolioId, stockId });
    return _store.addMembership(member);
  }

  async listStocks() {
    return _store.memberships
      .filter((member) => member.portfolioId === this.id);
  }

  static async find(conditions = []) {
    const list = _store.list();
    return _.entries(conditions).reduce((acc, [key, value]) => {
      return acc.filter((i) => i[key] === value);
    }, list);
  }

  static async findById(id) {
    if (!id) {
      throw new Error('missing.param:id');
    }
    return _store.get(id);
  }

  static async _seed() {
    _store = new PortfolioStore(seedData);
  }
}

class PortfolioStock {
  constructor(data) {
    const { id, portfolioId, stockId } = data;
    if (!portfolioId) {
      throw new Error('missing.property:data.portfolioId');
    }
    if (!stockId) {
      throw new Error('missing.property:data.stockId');
    }

    this.id = id || uuid();
    this.portfolioId = portfolioId;
    this.stockId = stockId;
  }
}

class PortfolioStore {
  constructor(seedData = []) {
    const seeds = (seedData.length)
      ? seedData.map((s) => new Portfolio(s))
      : [];

    this.portfolios = [].concat(seeds);
    this.memberships = [];
  }

  list() {
    return [].concat(this.portfolios);
  }

  get(id) {
    return this.portfolios.find((p) => p.id === id) || [];
  }

  save(portfolio) {
    this.portfolios = [].concat(this.portfolios, portfolio);
    return portfolio;
  }

  addMembership(portfolioStock) {
    this.memberships = [].concat(this.memberships, portfolioStock);
    return portfolioStock;
  }
}

module.exports = Portfolio;
