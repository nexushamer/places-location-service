PLACES LOCATOR

Requirements:
- Nodejs
- Mongodb or Docker with Mongo

How to run this project
You have to execute the following commands:

WITH DOCKER

If you have dokcer installed at your machine:

This command will run mongo at a dinamyc port

docker run --name tybamongodb -p 0:27017 -d mongo:4.0.13

For know which is the port of the container run the following command
docker ps

Modify the project in the folder config/properties.js and change the mongodb port

Finally execute the following command for execute the service

npm run start

WITHOUT DOCKER

You must have a mongo installed at your local machine

Modify the project in the folder config/properties.js and change the mongodb port

Finally execute the following command for execute the service

npm run start

HOW TO TEST THE PROJECT

Import the postman collection in postman application and play with the api

HOW TO RUN DOCKER COMPOSE

Check the branch improving-project for check how to run with docker compose and docker 
