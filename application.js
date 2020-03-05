global.rootRequire = name => require(`${__dirname}/${name}`);

const express = require('express');
let application = express();
const database = require('./config/database');
const routes = require('./routes/routes');
const auth = require('./config/middlewares/auth');
const cors = require('./config/middlewares/cors');
const transactions = require('./config/middlewares/transactions');
const transactionHandler = require('./transactions/transactionsEvent');
const logger = require('./config/logger');

database();
application.use(cors);
application.use(express.json());
application.use(express.urlencoded());
application.use(auth);
application.use(transactions);
routes(application);
transactionHandler.initialize();

logger.info(`The current environment is ${process.env.NODE_ENV}`);

module.exports = application;