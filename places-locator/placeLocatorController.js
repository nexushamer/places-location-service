const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');
const PlaceLocatorService = require('./placeLocatorService');

function validateModel(model){
    const schema = Joi.object().keys({
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
        place: Joi.string().min(4).max(50).required()
    });

    const { error } = schema.validate(model);
    if(error) {
        console.error(error);
        return false;
    }

    return true;
}

router.get('/place/:place/', async (request, response) => {
    const model = {
        latitude: request.query.latitude,
        longitude:request.query.longitude,
        place:request.params.place
    }

    if(!model || !validateModel(model)) {
        response.status(402).send({
            message: 'Invalid data send to operation,'
        });

        return;
    }

    const responseFromLocatorService = await PlaceLocatorService.searchPlaceByCoordinates(model);

    response.send(responseFromLocatorService);
});

module.exports = router;