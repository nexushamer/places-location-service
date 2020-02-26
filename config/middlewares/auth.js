const winston = require('winston');
const jwt = require('jsonwebtoken');
const properties = require('../properties');
const config = properties();
const BlackListService = require('../../blacklist/blackListService');

async function checkAuth(req, res, next) {
    winston.info('Checking if the request is authorized');
    if (req.path === '/api/user/login' || req.path === '/api/user/register-user') {
        next();
    } else {
        let validationToken = null 
        try {
            const autorizationHeader = req.header('Authorization');
            validationToken = jwt.verify(autorizationHeader, config.jsonWebTokenKey);
            const isTheTokenInvalid = await BlackListService.isInvalidTheToken(validationToken.email, autorizationHeader);
            if(validationToken &&  !isTheTokenInvalid) {
                req.userId = validationToken.email;
                winston.debug(validationToken);
                next();
            } else {
                throw new Error('The token is invalid because is unauthorized');
            }
        } catch(e) {
            winston.error(e);
            res.status(500).send({message: `The user is not authorized to access to this resource,${e}`});
        }
    }
}

module.exports = checkAuth;