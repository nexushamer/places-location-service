function generateHeadersForPermitCors(request, response, next) {
    const headers = {
        allowOrigin: {
            name: 'Access-Control-Allow-Origin',
            value: '*'
        },
        allowHeaders: {
            name: 'Access-Control-Allow-Headers',
            value: 'Origin, X-Requested-With, Content-Type, Accept, x-auth-token'
        },
    };

    response.header(headers.allowOrigin.name, headers.allowOrigin.value);
    response.header(headers.allowHeaders.name, headers.allowHeaders.value);
    next();
}

module.exports = generateHeadersForPermitCors;