let winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'placesLocation' },
    transports: [
        new winston.transports.Console({ colorize: true, prettyPrint: true, level: 'debug' }),
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'system.log', level: 'info' })
    ]
});

module.exports = logger;