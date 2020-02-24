const mongoose = require('mongoose');
const logger = require('../config/logger');
const properties = require('./properties');
const config = properties();

const DataBaseConfiguration = () => {
    logger.info('Starting the connection with the data base');
    mongoose
    .connect(config.mongodbUrl, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true,
     })
    .then(() => logger.info(`Connected to ${config.mongodbUrl}`));
};

module.exports = DataBaseConfiguration;