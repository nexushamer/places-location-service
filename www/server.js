const application = require('../application');
const logger = rootRequire('./config/logger');
const http = require('http');

const PORT = process.env.PORT || 3000;
application.set('port', PORT);

const server = http.createServer(application);

server.listen(PORT, logger.info(`The server is listening at the ${PORT} port`));