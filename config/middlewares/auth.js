const winston = require('winston');

function checkAuth(req, res, next) {
    winston.info('Checking the if the request is authorized');
    const autorizationHeader = req.header('Authorization');
    if(!autorizationHeader) {
        res.status(500).send({message: 'The user is not autorized to access to this resource'});
    } else {
        next();
    }
}

module.exports = checkAuth;