const express = require('express');
const router = express.Router();
const UserService = require('./userService');

router.get('/', async (request, response) => {
    let users = await UserService.retrieveAll();

    console.log('users');
    console.log(users);

    response.send(users);
});

router.get('/email/:email', async (request, response) => {
    const email = request.params.email;
    let users = await UserService.retrieveById(email);

    console.log('users');
    console.log(users);

    response.send(users);
});

router.post('/register-user', async (request, response, next) => {
    const user = request.body;
    
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
    const user = request.body;
    
    try{
        let responseMessage = await UserService.login(user.email, user.password);
        if(responseMessage.token)
            response.header('x-auth-token', responseMessage.token).status(200).send(responseMessage.message);
        else
            response.status(500).send(responseMessage.message);
        next();
    } catch(e){
        response.status(400).send(e.message);
        next();   
    }
});

module.exports = router;