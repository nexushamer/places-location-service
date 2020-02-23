const properties = require('./properties');
const mongoose = require('mongoose');

const DataBaseConfiguration = () => {
    mongoose
    .connect(properties.mongodbUrl, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true,
     })
    .then(() => console.log(`Connected to ${properties.mongodbUrl}`));
};

module.exports = DataBaseConfiguration;