'use strict';

const uuid = require('uuid/v4');
const _ = require('lodash');

let _store;

const seedData = [
  { userId: 'me', stockSymbol: 'SHOP' },
  { userId: 'me', stockSymbol: 'DBX' },
  { userId: 'me', stockSymbol: 'SBUX' },
];

class Stock {
  constructor(data) {
    const { id, userId, stockSymbol } = data;
    if (!userId) {
      throw new Error('missing.property:data.userId');
    }
    if (!stockSymbol) {
      throw new Error('missing.property:data.stockSymbol');
    }

    this.id = id || uuid();
    this.userId = userId;
    this.stockSymbol = stockSymbol;
  }

  async save() {
    return _store.save(this);
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
    _store = new StockStore(seedData);
  }
}

class StockStore {
  constructor(seedData = []) {
    const seeds = (seedData.length)
      ? seedData.map((s) => new Stock(s))
      : [];

    this.stocks = [].concat(seeds);
  }

  list() {
    return [].concat(this.stocks);
  }

  get(id) {
    return this.stocks.find((p) => p.id === id) || [];
  }

  save(stock) {
    this.stocks = [].concat(this.stocks, stock);
    return stock;
  }
}

module.exports = Stock;
