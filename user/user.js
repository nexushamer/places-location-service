const jwt = require('jsonwebtoken');
const properties = rootRequire('./config/properties');
const config = properties();
const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        maxlength: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    name: {
        type: String,
        required: false,
        maxlength: 8,
        maxlength: 50
    },
    lastName: {
        type: String,
        required: true,
        maxlength: 8,
        maxlength: 50
    },
    cellPhone: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10
    }
});

userSchema.methods.generateAuthToken = function() { 
    const token = jwt.sign({ _id: this._id, email: this.email }, config.jsonWebTokenKey);
    return token;
}

const User = mongoose.model('User', userSchema);

module.exports = User;