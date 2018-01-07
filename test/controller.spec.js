'use strict';

const { assert } = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire').noPreserveCache();

const InvalidMethodError = require('../lib/InvalidMethodError.class');

describe('Creating router', () => {

  const setup = function setup() {
    const router = {
      get: sinon.spy(),
      post: sinon.spy(),
    };
    const express = {
      Router: () => router,
    };
    const controller = proxyquire('../lib/controller', {
      express,
    });
    return {
      router,
      controller,
    };
  };

  it('Must throw an error when a method is not supported', () => {
    const { controller } = setup();

    const router = sinon.spy();
    const routes = {
      '/': {
        foo: sinon.spy(),
      },
    };
    assert.throws(() => controller(routes), InvalidMethodError, 'Method not supported: foo');
    sinon.assert.notCalled(router);
  });

  it('Must add a route to the router using the right path and method', () => {
    const { controller, router } = setup();

    const routes = {
      '/myPath': {
        get: sinon.spy(),
        post: sinon.spy(),
      },
    };

    controller(routes);
    sinon.assert.calledWith(router.get, '/myPath', routes['/myPath'].get);
    sinon.assert.calledWith(router.post, '/myPath', routes['/myPath'].post);
  });

  it('Must add a route and a middleware to the router using the right path and method', () => {
    const { controller, router } = setup();

    const middleware = sinon.stub();

    const routes = {
      '/myPath': {
        get: [middleware, sinon.spy()],
        post: [middleware, sinon.spy()],
      },
    };

    controller(routes);
    sinon.assert.calledWith(router.get, '/myPath', middleware, routes['/myPath'].get[1]);
    sinon.assert.calledWith(router.post, '/myPath', middleware, routes['/myPath'].post[1]);
  });

  it('Must add routes for every defined path', () => {
    const { controller, router } = setup();
    const routes = {
      '/myPath': {
        get: sinon.spy(),
      },
      '/myOtherPath': {
        post: sinon.spy(),
      },
    };

    controller(routes);
    sinon.assert.calledWith(router.get, '/myPath', routes['/myPath'].get);
    sinon.assert.calledWith(router.post, '/myOtherPath', routes['/myOtherPath'].post);
  });

});
