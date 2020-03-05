const axios = require('axios');
const properties = rootRequire('./config/properties');
const config = properties();

const logger = rootRequire('./config/logger');

const PlaceLocatorService = {
    searchPlaceByCoordinates: async (model) => {
        const placesApiEndpoint = config.placesApiEndpoint;
        const placesApiKey = config.placesApiKey;
        
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

        if (response && response.data) {
            return response.data;
        } else {
            return [];
        }
    }
};

module.exports = PlaceLocatorService;