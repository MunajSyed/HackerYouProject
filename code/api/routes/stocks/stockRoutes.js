'use strict';

const express = require('express');
const router = express.Router();

const stockService = require('./stockService');

// GET /api/stocks/
router.route('/')
  .get(async (req, res, next) => {
    try {
      const stocks = await stockService.listStocks();
      res.json({ data: stocks });
    } catch (e) {
      next(e);
    }
  })
  .post(async (req, res, next) => {
    try {
      const { body } = req;
      const stock = await stockService.createStock(body);
      res.status(201).json({
        data: [stock],
      });
    } catch (e) {
      next(e);
    }
  });

exports.router = router;
