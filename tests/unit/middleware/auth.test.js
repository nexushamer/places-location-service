global.rootRequire = name => require(`../../../${name}`);

const User = rootRequire('./user/user');
const auth = rootRequire('./config/middlewares/auth');
const mongoose = require('mongoose');
const BlackListService = rootRequire('./blacklist/blackListService');

jest.mock('../../../blacklist/blackListService', () => () => ({
    isInvalidTheToken: function () {
        return false;
    }
}));

describe('auth middleware', () => {
    beforeAll(() => {
        BlackListService.isInvalidTheToken = function() {
            return false;
        };
    })

  it('should populate req.userId with the payload of a valid JWT', async () => {
    const user = { 
      _id: mongoose.Types.ObjectId().toHexString(),
      email: 'usuario5@gmail.com'
    };
    const token = new User(user).generateAuthToken();
    let req = {
      header: jest.fn().mockReturnValue(token)
    };
    const res = {};
    const next = jest.fn();
    
    await auth(req, res, next);

    expect(req.userId).toMatch(user.email);
  });
});