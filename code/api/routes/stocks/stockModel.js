'use strict';

const uuid = require('uuid/v4');
const _ = require('lodash');

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

const seedData = [
  { userId: 'me', stockSymbol: 'SHOP' },
  { userId: 'me', stockSymbol: 'DBX' },
  { userId: 'me', stockSymbol: 'SBUX' },
];

const _store = new StockStore(seedData);

module.exports = Stock;

// async function main() {
//   console.log(await Stock.find());
//   const test = new Stock({ userId: 'you', stockSymbol: 'FB' });
//   const doc = await test.save();
//   console.log(await Stock.find());
// }

// main();
