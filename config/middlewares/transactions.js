const winston = require('winston');
const TransactionsEvent = require('../../transactions/transactionsEvent');

function registerTransactions(req, res, next) {
    winston.info('registerTransactions middlewares');
    try {
        const email = req.userId;
        winston.debug(`The email of the user log in is ${email}`);

        const model = '';
        if(req.body) 
            model = JSON.stringify(model);

        TransactionsEvent.eventEmitter.emit('registerTransaction',{
            user:email,
            service:req.path,
            message:model
        });
    } catch(e) {
        winston.error(e);
    }
    next();
}

module.exports = registerTransactions;