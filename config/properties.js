const config =  {
    development: {
        mongodbUrl: "mongodb://localhost:27017/local",
        jsonWebTokenKey: "estaesmiclave",
        placesApiEndpoint:"https://places.sit.ls.hereapi.com/places/v1/autosuggest",
        placesApiKey:"edrK4jyUR0JjBV7Z0jqhawOVsTARiRo_JiQqq-C64Uw"
    },
    test: {
        mongodbUrl: `mongodb://${process.env.MDB_IP}:${process.env.MDB_PORT}/local`,
        jsonWebTokenKey: "estaesmiclave",
        placesApiEndpoint:"https://places.sit.ls.hereapi.com/places/v1/autosuggest",
        placesApiKey:"edrK4jyUR0JjBV7Z0jqhawOVsTARiRo_JiQqq-C64Uw"
    }
}

module.exports = function() {
    return  config[process.env.NODE_ENV] || config['development'];
}