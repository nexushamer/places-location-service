var events = require('events');
const logger = require('../config/logger');
const TransactionsService = require('./transactionsService');

const TransactionsHandler = {
    eventEmitter:new events.EventEmitter(),
    initialize: () => {
        TransactionsHandler.eventEmitter.on('registerTransaction', async function (event) {
            logger.info('First subscriber: ' + event);
            await TransactionsService.registerEvent(event);
        });
    }
}

module.exports = TransactionsHandler;