const axios = require('axios');
const properties = require('../config/properties');
const logger = require('../config/logger');

const PlaceLocatorService = {
    searchPlaceByCoordinates: async (model) => {
        const placesApiEndpoint = properties.placesApiEndpoint;
        const placesApiKey = properties.placesApiKey;
        
        let response = null;
        try {
            response = await axios.default.get(placesApiEndpoint,{
                params: {
                    at:`${model.latitude},${model.longitude}`,
                    q:model.place,
                    apiKey:placesApiKey
                }
            });
        } catch(e) {
            logger.error(e)
            response = e;
        }

        return response.data;
    }
};

module.exports = PlaceLocatorService;