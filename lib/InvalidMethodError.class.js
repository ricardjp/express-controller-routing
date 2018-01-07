'use strict';

class InvalidMethodError extends Error {

  constructor(...args) {
    super(args);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }

}

module.exports = InvalidMethodError;
