const properties = require('./properties');
const mongoose = require('mongoose');
const logger = require('../config/logger');

const DataBaseConfiguration = () => {
    mongoose
    .connect(properties.mongodbUrl, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true,
     })
    .then(() => logger.info(`Connected to ${properties.mongodbUrl}`));
};

module.exports = DataBaseConfiguration;