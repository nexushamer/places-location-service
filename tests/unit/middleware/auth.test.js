const User = require('../../../user/user');
const auth = require('../../../config/middlewares/auth');
const mongoose = require('mongoose');

describe('auth middleware', () => {
  it('should populate req.userId with the payload of a valid JWT', () => {
    const user = { 
      _id: mongoose.Types.ObjectId().toHexString(),
      email: 'usuario5@gmail.com'
    };
    const token = new User(user).generateAuthToken();
    const req = {
      header: jest.fn().mockReturnValue(token)
    };
    const res = {};
    const next = jest.fn();
    
    auth(req, res, next);

    expect(req.userId).toMatch(user.email);
  });
});