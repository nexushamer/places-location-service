const bcrypt = require('bcryptjs');
const User = require('./user');

const UserService = {
    create : async function(user) {
        console.log(this);
        const possibleCurrentUser = await this.retrieveById(user.email);
        if(possibleCurrentUser.length > 0) {
            throw new Error('The user already exist at the database');
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        let userCollection = new User(user);

        await userCollection.save();

        return {description: 'User created successful'};
    },
    retrieveAll : async function() {
        const userCollections = await User.find({});
        const users = userCollections.map(user => mapUserCollectionToModel(user));

        return users;
    },
    retrieveById : async function(email) {
        let filter = {
            email
        };

        const userCollections = await User.find(filter);
        const users = userCollections.map(user => mapUserCollectionToModel(user));

        return users;
    },
    login: async function(email,password){
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