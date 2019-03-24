'use strict';

const express = require('express');
const router = express.Router();

const portfolioService = require('./portfolioService');

// GET /portfolios/
router.route('/')
  .get(async (req, res, next) => {
    try {
      const portfolios = await portfolioService.listPortfolios();
      res.json({ data: portfolios });
    } catch (e) {
      next(e);
    }
  })
  .post(async (req, res, next) => {
    try {
      const { body } = req;
      const portfolio = await portfolioService.createPortfolio(body);
      res.status(201).json({
        data: [portfolio]
      });
    } catch (e) {
      next(e);
    }
  });

// router.route('/:portfolioId')
//   .get(async (req, res, next) => {
//     try {
//       res.json({});
//     } catch (e) {
//       next(e);
//     }
//   });

router.route('/:portfolioId/stocks')
  .get(async (req, res, next) => {
    try {
      res.json({});
    } catch (e) {
      next(e);
    }
  })
  .post(async (req, res, next) => {
    try {
      res.json({});
    } catch (e) {
      next(e);
    }
  });

exports.router = router;
