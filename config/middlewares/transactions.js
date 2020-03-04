const winston = require('winston');
const TransactionsEvent = require('../../transactions/transactionsEvent');

function registerTransactions(req, res, next) {
    winston.info('registerTransactions middlewares');
    try {
        let model = '';
        let email = req.userId;
        if(req.body) {
            email =  (!email)?req.body.email:email;
            model = JSON.stringify(req.body);

            winston.debug(`The email of the user log in is ${email}`);
            TransactionsEvent.eventEmitter.emit('registerTransaction',{
                user:email,
                service:req.path,
                message:model
            });
        }
    } catch(e) {
        winston.error(e);
    }
    next();
}

module.exports = registerTransactions;