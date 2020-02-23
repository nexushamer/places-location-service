const bcrypt = require('bcryptjs');
const User = require('./user');
const logger = require('../config/logger');
const transactionHandler = require('../transactions/transactionsEvent');

const UserService = {
    create : async function(user) {
        logger.info('User Service create user method');
        const possibleCurrentUser = await this.retrieveById(user.email);
        if(possibleCurrentUser.length > 0) {
            const errorMessage = 'The user already exist at the database';
            logger.error(errorMessage);
            throw new Error(errorMessage);
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        let userCollection = new User(user);

        await userCollection.save();

        return {description: 'User created successful'};
    },
    retrieveAll : async function() {
        logger.info('User Service retrieveAll users method');
        const userCollections = await User.find({});
        const users = userCollections.map(user => mapUserCollectionToModel(user));

        return users;
    },
    retrieveById : async function(email) {
        logger.info('User Service retrieveUsers by id method');
        let filter = {
            email
        };

        const userCollections = await User.find(filter);
        const users = userCollections.map(user => mapUserCollectionToModel(user));

        return users;
    },
    login: async function(email,password){
        logger.info('User Service login method');
        let filter = {
            email
        };
        const userCollections = await User.find(filter);
        const user = userCollections[0];

        if(bcrypt.compare(password, user.password))
            return {
                token : user.generateAuthToken(),
                message: 'Authentication Sucessful'
            };

        return {
            message: 'Authentication Failed'
        };
    }
};

const mapUserCollectionToModel = function(userCollection) {
    return {
        email: userCollection.email,
        name: userCollection.name,
        lastName: userCollection.lastName,
        cellPhone: userCollection.cellPhone
    };
}

module.exports = UserService;