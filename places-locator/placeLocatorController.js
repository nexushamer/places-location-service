const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');
const PlaceLocatorService = require('./placeLocatorService');
const logger = rootRequire('./config/logger');

function validateModel(model){
    const schema = Joi.object().keys({
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
        place: Joi.string().min(4).max(50).required()
    });

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

router.get('/place/:place/', async (request, response) => {
    logger.info('Search place by cordinates endpoint');
    const model = {
        latitude: request.query.latitude,
        longitude:request.query.longitude,
        place:request.params.place
    }

    const validationObject = validateModel(model);

    if(!model || !validationObject.isValidTheModel) {
        logger.info('The data received is invalid');
        logger.debug(validationObject.error);
        response.status(402).send({
            message: `Invalid data sendto operation,${validationObject.error.message}`
        });

        return;
    }

    const responseFromLocatorService = await PlaceLocatorService.searchPlaceByCoordinates(model);

    response.send(responseFromLocatorService);
});

module.exports = router;