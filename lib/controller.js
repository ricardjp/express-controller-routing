'use strict';

const express = require('express');
const InvalidMethodError = require('./InvalidMethodError.class');

const SUPPORTED_METHODS = ['get', 'head', 'post', 'put', 'delete', 'trace', 'options', 'connect', 'patch'];

const importRoute = function importRoute(router, routePath, route, method) {
  if (!SUPPORTED_METHODS.includes(method.toLowerCase())) {
    throw new InvalidMethodError(`Method not supported: ${method}`);
  }
  router[method](routePath, ...Array.isArray(route) ? route : [route]);
};

const importPath = function importPath(router, routePath, routeDefinition) {
  Object.keys(routeDefinition).forEach((method) => {
    importRoute(router, routePath, routeDefinition[method], method);
  });
};

module.exports = function createRouter(routeDefinitions) {
  const router = express.Router();
  Object.keys(routeDefinitions).forEach((routePath) => {
    importPath(router, routePath, routeDefinitions[routePath]);
  });
  return router;
};
