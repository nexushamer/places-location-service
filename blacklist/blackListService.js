const BlackList = require('./blacklist');
const logger = require('../config/logger');

const BlackListService = {
    addToken: async function(email, token) {
        const model = new BlackList({
            userId: email,
            token: token
        });

        const response = await model.save();

        return response;
    },
    isInvalidTheToken: async function(email, token){
        const response = await BlackList.find({token: token, userId: email});

        if(response && response.length > 0) {
            return true;
        } else {
            return false;
        }
    }
};

module.exports = BlackListService;