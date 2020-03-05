const BlackList = require('./blacklist');
const logger = rootRequire('./config/logger');

const BlackListService = {
    addToken: async function (email, token) {
        logger.info('BlackListService.addToken');

        const model = new BlackList({
            userId: email,
            token: token
        });

        const response = await model.save();

        return response;
    },
    isInvalidTheToken: async function (email, token) {
        logger.info('BlackListService.isInvalidTheToken');
        const response = await BlackList.find({
            token: token,
            userId: email
        });

        if (response && response.length > 0) {
            return true;
        } else {
            return false;
        }
    }
};

module.exports = BlackListService;