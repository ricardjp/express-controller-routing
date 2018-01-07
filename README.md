# Express Controller
A simple way to create and test Express routes

## Install
    $ npm install express-controller


## Usage
Create a new Express controller file (./myRoute.js)
```javascript
const myFirstMiddleware = function myFirstMiddleware(req, res, next) {
  next();
};

const mySecondMiddleware = function mySecondMiddleware(req, res, next) {
  next();
};

module.exports = {
  
  '/': {
    post: function createSomething(req, res, next) {
      // do something
    },
  },
  
  '/my/path/to/:something': {
    get: function getSomething(req, res, next) {
      // do something
    },
    
    // you can also use an array if you need to use middlewares
    post: [myFirstMiddleware, mySecondMiddleware, function createSomethingElse(req, res, next) {
      
    }],
  },
  
};
```
Register this newly created controller in app.js
```javascript
const controller = require('express-controller');
const express = require('express');
const app = express();

// expose all routes defined in ./myRoute.js
app.use(controller(require('./myRoute')));

// or if you need all routes in to be prefixed
app.use('/myPrefix', controller(require('./myRoute')));
```
