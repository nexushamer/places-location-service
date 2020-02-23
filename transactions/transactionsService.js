const Transaction = require('./transaction');
const logger = require('../config/logger');

const TransactionService = {
    registerEvent : async function(event) {
        logger.info('TransactionService registerEvent method');
        let transactionCollection = new Transaction(event);
        await transactionCollection.save();

        return {description: 'Transaction created successful'};
    },
    retrieveTransactionsByUserId: async function(email) {
        logger.info('TransactionService retrieveTransactionsByUserId method');
        let filter = {
            user:email
        };

        let transactionCollections = await Transaction.find(filter);

        const transactions = transactionCollections
            .map(transaction => mapCollectionToModel(transaction));

        return transactions;
    }
};

function mapCollectionToModel(register){
    return {
        user:register.user,
        service:register.service,
        message:register.message
    }
}

module.exports = TransactionService;