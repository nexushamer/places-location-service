const express = require('express');
let application = express();
const database = require('./config/database');
const routes = require('./routes/routes');
const auth = require('./config/middlewares/auth');
const transactions = require('./config/middlewares/transactions');
const transactionHandler = require('./transactions/transactionsEvent');
const logger = require('./config/logger');


database();
application.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-auth-token");
    next();
  });
application.use(express.json());
application.use(express.urlencoded());
application.use(auth);
application.use(transactions);
routes(application);
transactionHandler.initialize();

logger.info(`The current environment is ${process.env.NODE_ENV}`);

module.exports = application;