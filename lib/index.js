'use strict';

const InvalidMethodError = require('./InvalidMethodError.class');
const controller = require('./controller');

module.exports = controller;
module.exports.InvalidMethodError = InvalidMethodError;
