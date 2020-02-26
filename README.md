# PLACES LOCATOR

## Requirements:
- Nodejs
- Mongodb or Docker with Mongo

## How to Run
You have to execute the following commands:

With Docker

If you have docker installed in your machine:

This command will run mongo at a dinamyc port

```
docker run --name tybamongodb -p 0:27017 -d mongo:4.0.13
```

For know which is the port of the container run the following command

```
docker ps
```

Modify the project in the folder config/properties.js and change the mongodb port

Finally execute the following command for execute the service

```
npm run start
```

Without Docker

You must have a mongo installed at your local machine

Modify the project in the folder config/properties.js and change the mongodb port

Finally execute the following command for execute the service

```
npm run start
```

## How to Test

Import the postman collection in postman application and play with the api

## How to Test with Docker and DockerCompose

Execute the following command for start the project with docker compose

This command will build the images from mongo an node

```
docker-compose build
```

This command will start the containers 

START CONTAINERS 

```
docker-compose up
```

START CONTAINERS WITHOUT BLOCK THE TERMINAL

```
docker-compose up -d
```

The placelocator service will run in the port 3000, change this port in the 
postman collection