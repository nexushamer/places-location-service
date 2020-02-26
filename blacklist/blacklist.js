const mongoose = require('mongoose');

const blackListSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        maxlength: 500,
        unique: true
    },
    userId: {
        type: String,
        required: true,
        maxlength: 50
    }
});

const BlackList = mongoose.model('BlackList', blackListSchema);

module.exports = BlackList;