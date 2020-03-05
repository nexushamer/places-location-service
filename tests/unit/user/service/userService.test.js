global.rootRequire = name => require(`../../../../${name}`);

const User = rootRequire('./user/user');
const UserService = rootRequire('./user/userService');
const mongoose = require('mongoose');
const mockingoose = require('mockingoose').default;

describe('user service', () => {
    it('when calling create user and the user is null', async () => {
        const user = null;
        try{
            await UserService.create(user);
        }catch(e){
            expect(new Error('The user is required for create the user at database')).toEqual(e);
        }
    });
    it('when calling create user and the User model return that the user already exists', async () => {
        const user = {
            _id: new mongoose.Types.ObjectId().toHexString(),
            email: 'usuario1@gmail.com',
            password:'',
            name:'Luis',
            lastName:'Medina',
            cellPhone:'3204110508'
        };

        mockingoose(User).toReturn([user], 'find');

        try{
            await UserService.create(user);
        }catch(e){
            expect(new Error('The user already exist at the database')).toEqual(e);
        }
    });
    it('when calling create user and the User model is created sucessful', async () => {
        const user = {
            _id: new mongoose.Types.ObjectId().toHexString(),
            email: 'usuario1@gmail.com',
            password:'',
            name:'Luis',
            lastName:'Medina',
            cellPhone:'3204110508'
        };

        mockingoose(User)
           .toReturn([], 'find')
           .toReturn({}, 'save');

        const result = await UserService.create(user);

        expect(result.description).toEqual('User created successful');
    });
    it('when calling retrieve all user and the object return list sucessful', async () => {
        const user = {
            _id: new mongoose.Types.ObjectId().toHexString(),
            email: 'usuario1@gmail.com',
            password:'',
            name:'Luis',
            lastName:'Medina',
            cellPhone:'3204110508'
        };
        mockingoose(User)
           .toReturn([user], 'find');

        const result = await UserService.retrieveAll();

        expect(result.length).toBeGreaterThan(0);
    });
    it('when calling retrieve by id user and the object return an object', async () => {
        const user = {
            _id: new mongoose.Types.ObjectId().toHexString(),
            email: 'usuario1@gmail.com',
            password:'',
            name:'Luis',
            lastName:'Medina',
            cellPhone:'3204110508'
        };
        mockingoose(User)
           .toReturn([user], 'find');

        const result = await UserService.retrieveById(user.email);

        expect(result[0].email).toEqual(user.email);
    });
});