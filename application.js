const express = require('express');
let application = express();
const database = require('./config/database');
const routes = require('./routes/routes');
const auth = require('./config/middlewares/auth');

database();
application.use(auth);
routes(application);

module.exports = application;