const express = require('express');
const router = express.Router();
const UserService = require('./userService');
const TransactionService = rootRequire('./transactions/transactionsService');
const logger = rootRequire('./config/logger');
const Joi = require('@hapi/joi');

function validateModel(model, schema){
    const { error } = schema.validate(model);
    if(error) {
        console.error(error);
        return {
            isValidTheModel:false,
            error:error
        };
    }

    return {
        isValidTheModel:true,
        error:error
    };
}

function validateRequestCreate(model){ 
    const schema = Joi.object().keys({
        email: Joi.string().max(80).required(),
        password: Joi.string().min(6).max(50).required(),
        name: Joi.string().min(4).max(50).required(),
        lastName: Joi.string().min(5).max(50).required(),
        cellPhone: Joi.string().min(10).max(10).required(),
    });

    return validateModel(model, schema); 
}

function validateEmail(model){
    const schema = Joi.object().keys({
        email: Joi.string().max(80).required(),
    });

    return validateModel(model, schema);
}

function validateEmailAndPassword(model){
    const schema = Joi.object().keys({
        email: Joi.string().max(80).required(),
        password: Joi.string().min(6).max(50).required(),
    });

    return validateModel(model, schema);
}

router.get('/', async (request, response) => {
    logger.info('Retrieve all users endpoint');
    let users = await UserService.retrieveAll();

    response.send(users);
});

router.get('/transactions/:email', async (request, response) => {
    logger.info('Retrieve all transactions of the user endpoint');
    
    const email = request.params.email;
    const validationObject = validateEmail({
        email: email
    });
    if(!email || !validationObject.isValidTheModel) {
        logger.info('The data received is invalid');
        logger.debug(validationObject.error);
        response.status(402).send({
            message: `Invalid data sendto operation,${validationObject.error.message}`
        });

        return;
    }

    const transactions = await TransactionService.retrieveTransactionsByUserId(email);

    response.send(transactions);
});

router.get('/email/:email', async (request, response) => {
    logger.info('Retrieve user by email endpoint');

    const email = request.params.email;
    const validationObject = validateEmail({
        email: email
    });
    if(!email || !validationObject.isValidTheModel) {
        logger.info('The data received is invalid');
        logger.debug(validationObject.error);
        response.status(402).send({
            message: `Invalid data sendto operation,${validationObject.error.message}`
        });

        return;
    }

    let users = await UserService.retrieveById(email);

    response.send(users);
});

router.post('/register-user', async (request, response, next) => {
    logger.info('Register user endpoint');
    const user = request.body;
    
    const validationObject = validateRequestCreate(user);
    if(!user || !validationObject.isValidTheModel) {
        logger.info('The data received is invalid');
        logger.debug(validationObject.error);
        response.status(402).send({
            message: `Invalid data sendto operation,${validationObject.error.message}`
        });

        return;
    }

    try{
        let responseMessage = await UserService.create(user);
        response.status(201).send(responseMessage);
        next();
    } catch(e){
        response.status(400).send(e.message);
        next();   
    }
});

router.post('/login', async (request, response, next) => {
    logger.info('Login endpoint');
    const user = request.body;

    const validationObject = validateEmailAndPassword(user);
    if(!user || !validationObject.isValidTheModel) {
        logger.info('The data received is invalid');
        logger.debug(validationObject.error);
        response.status(402).send({
            message: `Invalid data sendto operation,${validationObject.error.message}`
        });

        return;
    }

    try{
        let responseMessage = await UserService.login(user.email, user.password);
        if(responseMessage.accessToken) 
            response
                .header('x-auth-token', responseMessage.accessToken)
                .status(200)
                .send(responseMessage);
        else
            response.status(500).send(responseMessage.message);
        next();
    } catch(e){
        response.status(400).send(e.message);
        next();   
    }
});

router.post('/logout', async (request, response, next) => {
    logger.info('Login endpoint');
    try{
        const user = request.body;
        const autorizationHeader = request.header('Authorization');
        const responseFromService = await UserService.logout(user, autorizationHeader);
        response.status(200).send(responseFromService);
        next();
    } catch(e){
        response.status(400).send(e.message);
        next();   
    }
});

module.exports = router;