'use strict';

const {
  handleBodyRequestParsing,
  handleRequestLogging,
} = require('./common');
const { handleServingPublicFolder } = require('./public');

module.exports = [
  handleBodyRequestParsing,
  handleRequestLogging,
  handleServingPublicFolder,
];
