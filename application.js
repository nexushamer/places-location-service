const express = require('express');
let application = express();
const database = require('./config/database');
const routes = require('./routes/routes');
const auth = require('./config/middlewares/auth');
const transactions = require('./config/middlewares/transactions');
const transactionHandler = require('./transactions/transactionsEvent');

database();
application.use(auth);
application.use(transactions);
routes(application);
transactionHandler.initialize();

module.exports = application;