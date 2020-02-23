const mongoose = require('mongoose');

let transactionsSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        maxlength: 50,
        unique: false
    },
    service: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100
    },
    message: {
        type: String,
        required: false,
        maxlength: 4,
        maxlength: 500
    }
});

const Transaction = mongoose.model('Transaction', transactionsSchema);

module.exports = Transaction;