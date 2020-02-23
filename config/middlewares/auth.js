const winston = require('winston');
const jwt = require('jsonwebtoken');
const config = require('../properties');

function checkAuth(req, res, next) {
    winston.info('Checking if the request is authorized');
    if (req.path === '/api/user/login') {
        next();
    } else {
        let validationToken = null 
        try {
            const autorizationHeader = req.header('Authorization');
            validationToken = jwt.verify(autorizationHeader, config.jsonWebTokenKey);
            winston.debug(validationToken);
        } catch(e) {
            winston.error(e);
        }

        if(!validationToken) {
            res.status(500).send({message: 'The user is not authorized to access to this resource'});
        } else {
            next();
        }
    }
}

module.exports = checkAuth;