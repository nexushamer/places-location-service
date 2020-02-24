const winston = require('winston');
const jwt = require('jsonwebtoken');
const properties = require('../properties');
const config = properties();
const TransactionsEvent = require('../../transactions/transactionsEvent');

function loginTransactions(req, res, next) {
    try {
        const autorizationHeader = req.header('Authorization');
        const token = jwt.verify(autorizationHeader, config.jsonWebTokenKey);
        const email = token.email;

        const model = '';
        if(req.body) 
            model = JSON.stringify(model);

        TransactionsEvent.eventEmitter.emit('registerTransaction',{
            user:email,
            service:req.path,
            message:model
        });

        winston.debug(email);
    } catch(e) {
        winston.error(e);
    }
    next();
}

module.exports = loginTransactions;